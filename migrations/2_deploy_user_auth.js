// migrations/2_deploy_user_auth.js
const UserAuth = artifacts.require("UserAuth");

module.exports = function (deployer) {
    deployer.deploy(UserAuth);
};
