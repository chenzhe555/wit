import HomeModel from './home/model';
import HomeAction from './home/action';

export const mapState = {
    home: new HomeModel()
};

export const mapAction = {
    home: new HomeAction(mapState.home)
};