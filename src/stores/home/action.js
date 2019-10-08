import { decorate, action } from '@/mp-cz-mobx/mobx';

class HomeAction {
    constructor(home = {}) {
        this.home = home;
    }

    modifyCount() {
        this.home.count++;
    }
}

decorate(HomeAction, {
    modifyCount: action
});


export default HomeAction;