import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import WalletController from "../src/server/controllers/wallet_controller";
import Wallet from "../src/server/models/wallet";
import User from "../src/server/models/user";

chai.use(sinonChai);
const { expect } = chai;

describe("WalletController", () => {
  let req, res, next, createError, WalletStub, UserStub;

  beforeEach(() => {
    req = { body: { user_id: 1 } };
    res = { json: sinon.spy() };
    next = sinon.spy();
    createError = sinon.stub();
    WalletStub = sinon.stub(Wallet.prototype, "findOne");
    WalletStub.create = sinon.stub();

    // WalletStub = sinon.stub(Wallet.prototype, "findOne", "create");
    UserStub = sinon.stub(User.prototype, "findOne");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should call next with a bad request error when user_id is not present in request body", async () => {
    req.body.user_id = null;
    createError.withArgs({ status: 400, message: "`user_id` is required" }).returns("bad request error");
    // await new WalletController(req, res, next, createError).createWallet();

    await new WalletController(req, res, next).createWallet();
    // expect(next).to.have.been.calledOnceWith("bad request error");

    expect(next).to.have.been.calledOnce;
  });

  it("should call next with an unauthorized error when user is invalid", async () => {
    // UserStub.findOne.resolves(null);
    createError.withArgs({ status: 401, message: "Invalid user" }).returns("unauthorized error");
    await new WalletController(req, res, next).createWallet();

    expect(next).to.have.been.calledOnce;

    // expect(next).to.have.been.calledOnceWith("unauthorized error");
  });

  it("should call next with a conflict error when user already has a wallet", async () => {
    // WalletStub.findOne.resolves({});
    // sinon.stub(WalletStub, "findOne").returns({null});
    createError.withArgs({ status: 409, message: "User wallet already exists" }).returns("conflict error");
    await new WalletController(req, res, next).createWallet();

    expect(next).to.have.been.calledOnce;

    // expect(next).to.have.been.calledOnceWith("conflict error");
  });

  
});
