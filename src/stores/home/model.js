import { decorate, observable} from '@/mp-cz-mobx/mobx';

class HomeModel {
    count = 1
}

decorate(HomeModel, {
    count: observable
});

export default HomeModel;