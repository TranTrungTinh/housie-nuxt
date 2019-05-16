<template>
  <vue-simple-suggest
    class="search-box"
    pattern="\w+"
    mode="input"
    :list="getList"
    :max-suggestions="10"
    :min-length="3"
    :debounce="500"
    :filter-by-query="false"
    :prevent-submit="true"
    :controls="controls"
    :nullable-select="true"
    ref="suggestComponent"
    value-attribute="id"
    display-attribute="text"
    @select="onSuggestSelect"
    @request-start="onRequestStart"
    @request-done="onRequestDone"
    @request-failed="onRequestFailed"
  >
    <div class="search">
      <a-input-search size="large" @search="handleSearch" placeholder="Nhập từ khoá không có dấu"/>
    </div>
    
    <template slot="misc-item-above" slot-scope="{ suggestions }">
      <!-- <div class="suggestion-item--text misc-item">
        <span>Kết quả tìm kiếm cho '{{ query }}'.</span>
      </div> -->

      <template v-if="suggestions.length > 0">
        <div class="suggestion-item--text misc-item">
          <span>Có {{ suggestions.length }} gợi ý cho bạn...</span>
        </div>
        <hr>
      </template>

      <div class="suggestion-item--text misc-item" v-else-if="!loading">
        <span>Không tìm thấy</span>
      </div>
    </template>

    <div slot="suggestion-item" slot-scope="scope" :title="scope.suggestion.description">
      <div class="suggestion-item--text">
        <div v-html="boldenSuggestion(scope)"></div>
      </div>
    </div>

    <div class="misc-item" slot="misc-item-below" v-if="loading">
      <span>
        <a-icon type="loading-3-quarters" spin/> Đang tìm...
      </span>
    </div>
  </vue-simple-suggest>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      selected: {},
      mode: "input",
      loading: false,
      controls: {
        selectionUp: [38, 33],
        selectionDown: [40, 34],
        select: [13, 36],
        hideList: [27, 35]
      }
    }
  },
  methods: {
    ...mapActions({
      getSuggestionsKeywords: 'post/getSuggestionsKeywords'
    }),
    supportSlpit(mainString) {
      const index = mainString.indexOf('<span');
      const postString = mainString.substring(index);
      if(!index) return mainString;
      const pre = mainString.substring(0, index);
      if(pre.length < 30) return `${pre}${postString}`;
      const subPre = pre.substring(Math.floor(3 * pre.length / 4));
      return `...${subPre}${postString}`;
    },
    boldenSuggestion(scope) {
      if (!scope) return scope;
      const { suggestion, query } = scope;
      let result = this.$refs.suggestComponent.displayProperty(suggestion);
      if (!query) return result;
      const texts = query.split(/[\s-_/\\|\.]/gm).filter(t => !!t) || [""];
      const showReg = new RegExp("(.*?)(" + texts.join("|") + ")(.*?)", "gi");
      const mainString = result.replace ? result.replace(showReg, `$1<span class='match'>$2</span>$3`) : '';
      return this.supportSlpit(mainString);
    },
    handleSearch(value) {
      console.log(value)
    },
    onSuggestSelect(selected) { this.selected = selected },
    onRequestStart() { this.loading = true },
    onRequestDone() {  this.loading = false },
    onRequestFailed() { this.loading = false},
    getList(inputValue) {
      return this.getSuggestionsKeywords(inputValue);
    }
  }
};
</script>

<style lang="scss">
.search-box {
  width: 350px;
}
.vue-simple-suggest.designed .suggestions {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  top: calc(100% - 5px);
  border-radius: 8px;
  border: 1px solid #aaa;
  background-color: #fff;
  opacity: 1;
  z-index: 1000;
}
.suggestion-item--text {
  font-size: 16px;
  height: 40px;
  line-height: 40px;

  & > div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.match {
  color: #FD3D76;
  // text-decoration: underline;
  font-weight: bold;
}
.pre {
  display: inline-block;
  // white-space: pre-wrap;
  // word-wrap: break-word;
  // text-overflow: ellipsis; 
}
</style>