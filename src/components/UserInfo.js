export default class UserInfo {
    constructor(nameSelector, professionSelector, avatarSelector) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(professionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = this._name.textContent;
        userInfo.about = this._about.textContent;
        return userInfo;
    }

    setUserInfo(userInfo) {
        this._name.textContent = userInfo.name;
        this._about.textContent = userInfo.about;
    }

    setAvatar (userInfo) {
        this._avatar.src = userInfo.avatar;
    }

}