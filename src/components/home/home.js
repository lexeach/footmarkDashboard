import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import Web3 from "web3";
import { FPrint, USDT, ICO } from "../../utils/web3.js";
const Dashboard = () => {
  window.Buffer = Buffer;

  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

  const [account, setAccount] = useState();
  const [registration_Free, setRegistrationFee] = useState();
  const [currentId, setCurrentId] = useState();
  const [priceDiff, setPriceDiff] = useState();
  const [income, setIncome] = useState();
  const [userList, setUserList] = useState();
  const [register, setRegister] = useState();
  const [currUserID, setCurrUserID] = useState();
  const [tokenPrice, setTokenPrice] = useState();

  const [pool1_price, setPool1_price] = useState();
  const [pool1activeUserID, setPool1activeUserID] = useState();
  const [pool1currUserID, setPool1currUserID] = useState();
  const [pool1userList, setPool1userList] = useState();
  const [pool1users, setPool1users] = useState();

  const [pool2_price, setPool2_price] = useState();
  const [pool2activeUserID, setPool2activeUserID] = useState();
  const [pool2currUserID, setPool2currUserID] = useState();
  const [pool2userList, setPool2userList] = useState();
  const [pool2users, setPool2users] = useState();

  const [pool3_price, setPool3_price] = useState();
  const [pool3activeUserID, setPool3activeUserID] = useState();
  const [pool3currUserID, setPool3currUserID] = useState();
  const [pool3userList, setPool3userList] = useState();
  const [pool3users, setPool3users] = useState();

  const [pool4_price, setPool4_price] = useState();
  const [pool4activeUserID, setPool4activeUserID] = useState();
  const [pool4currUserID, setPool4currUserID] = useState();
  const [pool4userList, setPool4userList] = useState();
  const [pool4users, setPool4users] = useState();

  const [loading, setLoading] = useState(false);
  const [referrerId, setReferrerId] = useState();
  const [coReferrerId, setCoReferrerId] = useState();
  const [amount, setAmount] = useState();

  const [pool1Exist, setPool1Exist] = useState();
  const [pool2Exist, setPool2Exist] = useState();
  const [pool3Exist, setPool3Exist] = useState();
  const [pool4Exist, setPool4Exist] = useState();

  useEffect(() => {
    async function load() {
      const accounts = await web3.eth.requestAccounts();
      if (!accounts) {
        alert("please install metamask");
      }

      setAccount(accounts[0]);
      console.log("Account is ", account);
      // let BEP20_ = new web3.eth.Contract(BEP20.ABI, BEP20.address);
      let NEW_CBC_ROI = new web3.eth.Contract(FPrint.ABI, FPrint.address);
      let ICO_ = new web3.eth.Contract(ICO.ABI, ICO.address);
      let RegistrationFee = await NEW_CBC_ROI.methods
        .REGESTRATION_FESS()
        .call();
      console.log("Accounts of zero is :", accounts[0]);

      const convert_regfee = Number(
        web3.utils.fromWei(RegistrationFee, "ether")
      ).toFixed(2);
      setRegistrationFee(convert_regfee);
      // set Last TopUp:
      let currentID = await NEW_CBC_ROI.methods.currUserID().call();
      setCurrentId(currentID);

      let currentUserIDs = await ICO_.methods.currUserID().call();
      setCurrUserID(currentUserIDs);

      let tokenPrices = await ICO_.methods.tokenPrice().call();
      setTokenPrice(
        Number(web3.utils.fromWei(tokenPrices, "ether")).toFixed(4)
      );

      let priceDiffer = await NEW_CBC_ROI.methods
        .getPricesDiff(accounts[0])
        .call();

      let newObj = {
        time: priceDiffer._times,
        price: priceDiffer._prices,
        currentID: priceDiffer._currentUserID,
      };
      setPriceDiff(newObj);

      let incomes = await NEW_CBC_ROI.methods.income(accounts[0]).call();
      let newIncomes = {
        planer: incomes.planer,
        income: incomes.income,
      };
      setIncome(newIncomes);

      let registers = await NEW_CBC_ROI.methods.register(accounts[0]).call();
      let objRegiters = {
        isExist: registers.isExist ? "true" : "false",
        id: registers.id,
        winAmount: registers.winAmount,
        timeStamp: registers.timeStamp,
        price: registers.price,
        currentUserID: registers.currentUserID,
      };
      setRegister(objRegiters);

      let userLists = await NEW_CBC_ROI.methods.userList(accounts[0]).call();
      setUserList(userLists);
      let pool1Price = await NEW_CBC_ROI.methods.pool1_price().call();
      setPool1_price(
        Number(web3.utils.fromWei(pool1Price, "ether")).toFixed(2)
      );

      let pool1activeUserIDs = await NEW_CBC_ROI.methods
        .pool1activeUserID()
        .call();
      setPool1activeUserID(pool1activeUserIDs);

      let pool1currUserIDs = await NEW_CBC_ROI.methods.pool1currUserID().call();
      setPool1currUserID(pool1currUserIDs);

      let pool1userLists = await NEW_CBC_ROI.methods
        .pool1userList(accounts[0])
        .call();
      setPool1userList(pool1userLists);

      let pool1userss = await NEW_CBC_ROI.methods
        .pool1users(accounts[0])
        .call();
      let objPool1USers = {
        isExist: pool1userss.isExist ? "true" : "false",
        id: pool1userss.id,
        payment_received: pool1userss.payment_received,
        pool1Income: pool1userss.pool1Income,
        usedIncome: pool1userss.usedIncome,
        balanceIncome: pool1userss.balanceIncome,
      };
      setPool1Exist(pool1userss.isExist);
      setPool1users(objPool1USers);

      let pool2Price = await NEW_CBC_ROI.methods.pool2_price().call();
      setPool2_price(
        Number(web3.utils.fromWei(pool2Price, "ether")).toFixed(2)
      );

      let pool2activeUserIDs = await NEW_CBC_ROI.methods
        .pool2activeUserID()
        .call();
      setPool2activeUserID(pool2activeUserIDs);

      let pool2currUserIDs = await NEW_CBC_ROI.methods.pool2currUserID().call();
      setPool2currUserID(pool2currUserIDs);

      let pool2userLists = await NEW_CBC_ROI.methods
        .pool2userList(accounts[0])
        .call();
      setPool2userList(pool2userLists);

      let pool2userss = await NEW_CBC_ROI.methods
        .pool2users(accounts[0])
        .call();
      let objPool2USers = {
        isExist: pool2userss.isExist ? "true" : "false",
        id: pool2userss.id,
        payment_received: pool2userss.payment_received,
        pool2Income: pool2userss.pool2Income,
        usedIncome: pool2userss.usedIncome,
        balanceIncome: pool2userss.balanceIncome,
      };
      setPool2Exist(pool2userss.isExist);
      setPool2users(objPool2USers);

      let pool3Price = await NEW_CBC_ROI.methods.pool3_price().call();
      setPool3_price(
        Number(web3.utils.fromWei(pool3Price, "ether")).toFixed(2)
      );

      let pool3activeUserIDs = await NEW_CBC_ROI.methods
        .pool3activeUserID()
        .call();
      setPool3activeUserID(pool3activeUserIDs);

      let pool3currUserIDs = await NEW_CBC_ROI.methods.pool3currUserID().call();
      setPool3currUserID(pool3currUserIDs);

      let pool3userLists = await NEW_CBC_ROI.methods
        .pool3userList(accounts[0])
        .call();
      setPool3userList(pool3userLists);

      let pool3userss = await NEW_CBC_ROI.methods
        .pool3users(accounts[0])
        .call();
      let objPool3USers = {
        isExist: pool3userss.isExist ? "true" : "false",
        id: pool3userss.id,
        payment_received: pool3userss.payment_received,
        pool3Income: pool3userss.pool3Income,
        usedIncome: pool3userss.usedIncome,
        balanceIncome: pool3userss.balanceIncome,
      };
      setPool3Exist(pool3userss.isExist);

      setPool3users(objPool3USers);

      let pool4Price = await NEW_CBC_ROI.methods.pool4_price().call();
      setPool4_price(
        Number(web3.utils.fromWei(pool4Price, "ether")).toFixed(2)
      );

      let pool4activeUserIDs = await NEW_CBC_ROI.methods
        .pool4activeUserID()
        .call();
      setPool4activeUserID(pool4activeUserIDs);

      let pool4currUserIDs = await NEW_CBC_ROI.methods.pool4currUserID().call();
      setPool4currUserID(pool4currUserIDs);

      let pool4userLists = await NEW_CBC_ROI.methods
        .pool4userList(accounts[0])
        .call();
      setPool4userList(pool4userLists);

      let pool4userss = await NEW_CBC_ROI.methods
        .pool4users(accounts[0])
        .call();
      let objPool4USers = {
        isExist: pool4userss.isExist ? "true" : "false",
        id: pool4userss.id,
        payment_received: pool4userss.payment_received,
        pool4Income: pool4userss.pool4Income,
        usedIncome: pool4userss.usedIncome,
        balanceIncome: pool4userss.balanceIncome,
      };
      setPool4Exist(pool4userss.isExist);

      setPool4users(objPool4USers);
    }

    load();
  }, []);

  const handleChangeReferrerId = (event) => {
    setReferrerId(event.target.value);
  };
  const handleChangeCoReferrerId = (event) => {
    setCoReferrerId(event.target.value);
  };
  const handleChangeAmount = (event) => {
    console.log("setReferrerId Amount", event.target.value);
    setAmount(event.target.value);
  };

  // Registration  Write function Called
  const handleSubmitRegistration = async (event) => {
    event.preventDefault();
    try {
      const isEthereumAddress = /^(0x)?[0-9a-fA-F]{40}$/.test(referrerId);

      let amount = web3.utils.toWei(registration_Free, "ether"); // registration_Free; //web3.utils.toWei(amount, "ether")).toFixed(2) / 10000000000000000;

      let FPrint_ = new web3.eth.Contract(FPrint.ABI, FPrint.address);
      let USDT_ = new web3.eth.Contract(USDT.ABI, USDT.address);
      let isAllowance = await USDT_.methods
        .allowance(account, FPrint.address)
        .call();
      let isApprove, reg_user;
      if (isAllowance < amount) {
        setLoading(true);

        isApprove = await USDT_.methods
          .approve(FPrint.address, amount)
          .send({ from: account })
          .on("receipt", async function (receipt) {
            setLoading(false);
            if (!isEthereumAddress) {
              reg_user = await FPrint_.methods
                .Registration(referrerId, coReferrerId, amount)
                .send({ from: account, value: 0 });
            } else {
              reg_user = await FPrint_.methods
                .Registration2(referrerId, coReferrerId, amount)
                .send({ from: account, value: 0 });
            }

            console.log("****** native coin accepting condtion", reg_user);
            if (reg_user.status) {
              alert("Registerd Success");
            } else {
              alert("Registerd Failed !!!!");
            }
          })
          .on("error", function (error, receipt) {
            // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            setLoading(false);
          });
      } else {
        if (!isEthereumAddress) {
          reg_user = await FPrint_.methods
            .Registration(referrerId, coReferrerId, amount)
            .send({ from: account, value: 0 });
        } else {
          reg_user = await FPrint_.methods
            .Registration2(referrerId, coReferrerId, amount)
            .send({ from: account, value: 0 });
        }
        console.log("****** native coin accepting condtion", reg_user);
        if (reg_user.status) {
          alert("Registerd Success");
        } else {
          alert("Registerd Failed !!!!");
        }
      }
    } catch (e) {
      alert("Error is catched");
    }
  };

  const handleSubmitIUpdatePool = async (event) => {
    event.preventDefault();
    try {
      let FPrint_ = new web3.eth.Contract(FPrint.ABI, FPrint.address);

      if (pool3Exist) {
        await FPrint_.methods.upgradePool4().send({ from: account });
      } else if (pool2Exist) {
        await FPrint_.methods.upgradePool3().send({ from: account });
      } else {
        await FPrint_.methods.upgradePool3().send({ from: account });
      }
    } catch (e) {
      alert("Error is catched");
    }
  };
  const handleSubmitIWithdrawPool1 = async (event) => {
    event.preventDefault();
    try {
      let FPrint_ = new web3.eth.Contract(FPrint.ABI, FPrint.address);
      await FPrint_.methods.withdrawPool1Income().send({ from: account });
    } catch (e) {
      alert("Error is catched");
    }
  };

  const handleSubmitIWithdrawPool2 = async (event) => {
    event.preventDefault();
    try {
      let FPrint_ = new web3.eth.Contract(FPrint.ABI, FPrint.address);
      await FPrint_.methods.withdrawPool2Income().send({ from: account });
    } catch (e) {
      alert("Error is catched");
    }
  };

  const handleSubmitIWithdrawPool3 = async (event) => {
    event.preventDefault();
    try {
      let FPrint_ = new web3.eth.Contract(FPrint.ABI, FPrint.address);
      await FPrint_.methods.withdrawPool3Income().send({ from: account });
    } catch (e) {
      alert("Error is catched");
    }
  };

  const handleSubmitIWithdrawPool4 = async (event) => {
    event.preventDefault();
    try {
      let FPrint_ = new web3.eth.Contract(FPrint.ABI, FPrint.address);
      await FPrint_.methods.withdrawPool4Income().send({ from: account });
    } catch (e) {
      alert("Error is catched");
    }
  };
  const poolTitle = pool4Exist
    ? "Update Pool 4"
    : pool3Exist
    ? "Update Pool 4"
    : pool2Exist
    ? "Update Pool 3"
    : "Update Pool 2";
  return (
    <div className="home-container">
      <div className="col-sm-12 grid-margin">
        <div className="card">
          <div className="card-body text-center">Public Value</div>
        </div>
      </div>
      <div className="card-container container1">
        <div className="row">
          {/* Registration Fee  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Registration Fee</h5>
                <h4 className="mb-0">
                  {registration_Free ? registration_Free : 0} USDT
                </h4>
              </div>
            </div>
          </div>

          {/* Current User Fee  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Current User ID</h5>
                <h4 className="mb-0">{currUserID ? currUserID : 0}</h4>
              </div>
            </div>
          </div>

          {/* Current User Fee  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Current User ID FP</h5>
                <h4 className="mb-0">{currentId ? currentId : 0}</h4>
              </div>
            </div>
          </div>

          {/* tokenPrice  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Token Price</h5>
                <h4 className="mb-0">{tokenPrice ? tokenPrice : 0}</h4>
              </div>
            </div>
          </div>

          {/* User List  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>User List</h5>
                <h4 className="mb-0">{userList ? userList : 0}</h4>
              </div>
            </div>
          </div>
          {/* Price Diff  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Price Difference</h5>
                <h4 className="mb-0">
                  {priceDiff ? (
                    <div>
                      {Object.keys(priceDiff).map((key, index) => (
                        <div key={index}>
                          <p>
                            {key} : {priceDiff[key]}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>0</p>
                  )}
                </h4>
              </div>
            </div>
          </div>

          {/* income */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Income</h5>
                <h4 className="mb-0">
                  {income ? (
                    <div>
                      {Object.keys(income).map((key, index) => (
                        <div key={index}>
                          <p>
                            {key} : {income[key]}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>0</p>
                  )}
                </h4>
              </div>
            </div>
          </div>

          {/* register */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>register</h5>
                <h4 className="mb-0">
                  {register ? (
                    <div>
                      {Object.keys(register).map((key, index) => (
                        <div key={index}>
                          <p>
                            {key} : {register[key]}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>0</p>
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-12 grid-margin">
        <div className="card">
          <div className="card-body text-center">Pool1 Value</div>
        </div>
      </div>
      {/* Pool 1 Row Container */}
      <div className="card-container container2">
        <div className="row">
          {/* pool1_price */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool1 Price</h5>
                <h4 className="mb-0">{pool1_price ? pool1_price : 0} USDT</h4>
              </div>
            </div>
          </div>

          {/* pool1activeUserID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool1 Active User ID</h5>
                <h4 className="mb-0">
                  {pool1activeUserID ? pool1activeUserID : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* pool1currUserID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool1 Current User ID</h5>
                <h4 className="mb-0">
                  {pool1currUserID ? pool1currUserID : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* Pool1 User List  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Pool1 User List</h5>
                <h4 className="mb-0">{pool1userList ? pool1userList : 0}</h4>
              </div>
            </div>
          </div>
          {/* pool1users  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool1 Users</h5>
                <h4 className="mb-0">
                  {pool1users ? (
                    <div>
                      {Object.keys(pool1users).map((key, index) => (
                        <div key={index}>
                          <p>
                            {key} : {pool1users[key]}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>0</p>
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-12 grid-margin">
        <div className="card">
          <div className="card-body text-center">Pool2 Value</div>
        </div>
      </div>
      {/* Pool 2Row Container */}
      <div className="card-container container3">
        <div className="row">
          {/* pool1_price */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool2 Price</h5>
                <h4 className="mb-0">{pool2_price ? pool2_price : 0} USDT</h4>
              </div>
            </div>
          </div>

          {/* pool1activeUserID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool2 Active User ID</h5>
                <h4 className="mb-0">
                  {pool2activeUserID ? pool2activeUserID : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* pool1currUserID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool2 Current User ID</h5>
                <h4 className="mb-0">
                  {pool2currUserID ? pool2currUserID : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* Pool1 User List  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Pool2 User List</h5>
                <h4 className="mb-0">{pool2userList ? pool2userList : 0}</h4>
              </div>
            </div>
          </div>
          {/* pool1users  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool2 Users</h5>
                <h4 className="mb-0">
                  {pool2users ? (
                    <div>
                      {Object.keys(pool2users).map((key, index) => (
                        <div key={index}>
                          <p>
                            {key} : {pool2users[key]}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>0</p>
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-12 grid-margin">
        <div className="card">
          <div className="card-body text-center">Pool3 Value</div>
        </div>
      </div>
      {/* Pool 3 Row Container */}
      <div className="card-container container4">
        <div className="row">
          {/* pool1_price */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool3 Price</h5>
                <h4 className="mb-0">{pool3_price ? pool3_price : 0} USDT</h4>
              </div>
            </div>
          </div>

          {/* pool1activeUserID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool3 Active User ID</h5>
                <h4 className="mb-0">
                  {pool3activeUserID ? pool3activeUserID : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* pool1currUserID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool3 Current User ID</h5>
                <h4 className="mb-0">
                  {pool3currUserID ? pool3currUserID : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* Pool1 User List  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Pool3 User List</h5>
                <h4 className="mb-0">{pool3userList ? pool3userList : 0}</h4>
              </div>
            </div>
          </div>
          {/* pool1users  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool3 Users</h5>
                <h4 className="mb-0">
                  {pool3users ? (
                    <div>
                      {Object.keys(pool3users).map((key, index) => (
                        <div key={index}>
                          <p>
                            {key} : {pool3users[key]}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>0</p>
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-12 grid-margin">
        <div className="card">
          <div className="card-body text-center">Pool4 Value</div>
        </div>
      </div>
      {/* Pool 4 Row Container */}
      <div className="card-container container5">
        <div className="row">
          {/* pool1_price */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool4 Price</h5>
                <h4 className="mb-0">{pool4_price ? pool4_price : 0} USDT</h4>
              </div>
            </div>
          </div>

          {/* pool1activeUserID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool4 Active User ID</h5>
                <h4 className="mb-0">
                  {pool4activeUserID ? pool4activeUserID : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* pool1currUserID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool4 Current User ID</h5>
                <h4 className="mb-0">
                  {pool4currUserID ? pool4currUserID : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* Pool1 User List  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Pool4 User List</h5>
                <h4 className="mb-0">{pool4userList ? pool4userList : 0}</h4>
              </div>
            </div>
          </div>
          {/* pool1users  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool4 Users</h5>
                <h4 className="mb-0">
                  {pool4users ? (
                    <div>
                      {Object.keys(pool4users).map((key, index) => (
                        <div key={index}>
                          <p>
                            {key} : {pool4users[key]}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>0</p>
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-12 grid-margin">
        <div className="card">
          <div className="card-body text-center">Signing Section</div>
        </div>
      </div>
      <div className="card-container container6">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Registration</h5>
                <div className="row">
                  <div className="col-sm-12 my-auto">
                    <form
                      className="forms-sample"
                      onSubmit={handleSubmitRegistration}
                    >
                      <div className="form-group w-100">
                        <input
                          className="form-control mt-2"
                          type="text"
                          required
                          name="referrerId"
                          onChange={handleChangeReferrerId}
                          value={referrerId || ""}
                          placeholder="Number ID or Address"
                        />

                        <input
                          className="form-control mt-2"
                          type="number"
                          required
                          name="coReferrerId"
                          onChange={handleChangeCoReferrerId}
                          value={coReferrerId || ""}
                          placeholder="Co Referrer ID"
                        />
                        <input
                          className="form-control mt-2"
                          type="number"
                          required
                          name="amount"
                          onChange={handleChangeAmount}
                          value={amount || ""}
                          placeholder="Reg Amount"
                        />

                        {loading && (
                          <div className="loader-overlay">
                            {" "}
                            Transaction is Approving{" "}
                          </div>
                        )}
                        <input
                          className="btn mt-3 submitbtn_"
                          type="submit"
                          value="Registration"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>{poolTitle}</h5>
                <div className="row">
                  <div className="col-sm-12 my-auto">
                    <form
                      className="forms-sample"
                      onSubmit={handleSubmitIUpdatePool}
                    >
                      <div className="form-group w-100">
                        <input
                          className="btn mt-3 submitbtn_"
                          type="submit"
                          value="Update Pool"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Withdraw Pool1 Income</h5>
                <div className="row">
                  <div className="col-sm-12 my-auto">
                    <form
                      className="forms-sample"
                      onSubmit={handleSubmitIWithdrawPool1}
                    >
                      <div className="form-group w-100">
                        <input
                          className="btn mt-3 submitbtn_"
                          type="submit"
                          value="Withdraw Pool1"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Withdraw Pool2 Income</h5>
                <div className="row">
                  <div className="col-sm-12 my-auto">
                    <form
                      className="forms-sample"
                      onSubmit={handleSubmitIWithdrawPool2}
                    >
                      <div className="form-group w-100">
                        <input
                          className="btn mt-3 submitbtn_"
                          type="submit"
                          value="Withdraw Pool2"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Withdraw Pool3 Income</h5>
                <div className="row">
                  <div className="col-sm-12 my-auto">
                    <form
                      className="forms-sample"
                      onSubmit={handleSubmitIWithdrawPool3}
                    >
                      <div className="form-group w-100">
                        <input
                          className="btn mt-3 submitbtn_"
                          type="submit"
                          value="Withdraw Pool3"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Withdraw Pool4 Income</h5>
                <div className="row">
                  <div className="col-sm-12 my-auto">
                    <form
                      className="forms-sample"
                      onSubmit={handleSubmitIWithdrawPool4}
                    >
                      <div className="form-group w-100">
                        <input
                          className="btn mt-3 submitbtn_"
                          type="submit"
                          value="Withdraw Pool4"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
