import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import TransferController from "../src/server/controllers/transfer_controller";
import Wallet from "../src/server/models/wallet";
import User from "../src/server/models/user";

chai.use(sinonChai);
const { expect } = chai;

describe("TransferController", () => {
  let req, res, next, createError, WalletStub, UserStub;

  beforeEach(() => {
    req = { body: { from: 1, to: 2 } };
    res = { json: sinon.spy() };
    next = sinon.spy();
    createError = sinon.stub();
    WalletStub = sinon.stub(Wallet.prototype, "findOne");
    WalletStub.create = sinon.stub();

    UserStub = sinon.stub(User.prototype, "findOne");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should call next with a bad request error when `from` is not present in request body", async () => {
    req.body.from = null;
    createError.withArgs({ status: 500, message: "`from`, `to` are required" }).returns("bad request error");

    await new TransferController(req, res, next).transfer();
    expect(next).to.have.been.calledOnce;
  });

  it("should return false when the balance is less than the amount", () => {
    const balance = 100;
    const amount = 150;
    const result = new TransferController(req, res, next).balanceIsMoreThanAmount(balance, amount);
    expect(result).to.be.false;
  });

  it("should return true when the balance is more than the amount", () => {
    const balance = 200;
    const amount = 150;
    const result = new TransferController(req, res, next).balanceIsMoreThanAmount(balance, amount);
    expect(result).to.be.true;
  });

  it("should return true when the balance is equal to the amount", () => {
    const balance = 150;
    const amount = 150;
    const result = new TransferController(req, res, next).balanceIsMoreThanAmount(balance, amount);
    expect(result).to.be.false;
  });
  
});
