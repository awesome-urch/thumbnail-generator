import { expect } from "chai";
import sinon from "sinon";
import WalletController from "../src/server/controllers/wallet_controller";
import Wallet from "../src/server/models/wallet";
import { createError, BAD_REQUEST, CONFLICT } from "../src/server/helpers/error_helper";

describe("WalletController", () => {
  let req;
  let res;
  let next;
  let createWallet;
  let sandbox;

  beforeEach(() => {
    req = { body: { user_id: "123" } };
    res = { json: sinon.stub() };
    next = sinon.stub();
    createWallet = new WalletController(req, res, next).createWallet;
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should return bad request if user_id is not provided", async () => {
    req.body.user_id = undefined;
    await createWallet();
    expect(next.calledOnce).to.be.true;
    expect(next.firstCall.args[0].status).to.equal(BAD_REQUEST);
    expect(next.firstCall.args[0].message).to.equal("`user_id` is required");
  });

  it("should return conflict if user wallet already exists", async () => {
    sandbox.stub(Wallet, "findOne").resolves({});
    await createWallet();
    expect(next.calledOnce).to.be.true;
    expect(next.firstCall.args[0].status).to.equal(CONFLICT);
    expect(next.firstCall.args[0].message).to.equal("User wallet already exists");
  });

  it("should create wallet if user_id is provided and wallet does not exist", async () => {
    sandbox.stub(Wallet, "findOne").resolves(null);
    sandbox.stub(Wallet, "create").resolves({});
    await createWallet();
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.deep.equal({
      ok: true,
      message: "Wallet created successfully",
      newWallet: {}
    });
  });
});
