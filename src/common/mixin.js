import {POP, NEW, SELL} from "./const";
import BackTop from 'components/content/backTop/BackTop'

export const backTopMixin = {
  data: function () {
    return {
      isShowBackTop: false
    }
  },
	components: {
		BackTop
	},
  methods: {
   backClick() {
     this.$refs.scroll.scrollTo(0, 0, 500)
   },
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
