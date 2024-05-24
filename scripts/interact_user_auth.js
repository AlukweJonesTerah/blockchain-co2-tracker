const UserAuth = artifacts.require("UserAuth");

const registerUser = async (walletId, name, privilege, authority) => {
    const userAuth = await UserAuth.deployed();
    await userAuth.setUser(walletId, name, privilege, authority, { from: walletId });
};

const checkUser = async (walletId) => {
    const userAuth = await UserAuth.deployed();
    const exists = await userAuth.checkUserExists(walletId);
    console.log("User exists:", exists);
};

module.exports = async function(callback) {
    try {
        const walletId = "0x123..."; // Replace with actual wallet address
        await registerUser(walletId, "John Doe", "industry", "Some Authority");
        await checkUser(walletId);
    } catch (error) {
        console.error(error);
    }
    callback();
};
