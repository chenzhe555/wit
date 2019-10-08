import BaseComponent from '@/bases/BaseComponent';
import { mapState, mapAction } from '@/stores/index.js';

BaseComponent({
    props: {
        home: mapState.home
    }
});