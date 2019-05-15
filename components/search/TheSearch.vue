<template>
  <vue-simple-suggest
    class="search-box"
    pattern="\w+"
    :list="getList"
    :max-suggestions="10"
    :min-length="3"
    :debounce="200"
    :filter-by-query="false"
    :prevent-submit="true"
    :controls="{
        selectionUp: [38, 33],
        selectionDown: [40, 34],
        select: [13, 36],
        hideList: [27, 35]
      }"
    :mode="mode"
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
      <a-input-search size="large" @search="handleSearch" placeholder="Từ khoá 'Phòng trọ'"/>
    </div>
    
    <!-- <test-input placeholder="Search information..." /> -->

    <template slot="misc-item-above" slot-scope="{ suggestions, query }">
      <div class="suggestion-item--text misc-item">
        <span>Kết quả tìm kiếm cho '{{ query }}'.</span>
      </div>

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
        <span v-html="boldenSuggestion(scope)"></span>
      </div>
    </div>

    <div class="misc-item" slot="misc-item-below" v-if="loading">
      <span>Đang tìm...</span>
    </div>
  </vue-simple-suggest>
</template>

<script>
export default {
  data() {
    return {
      selected: '',
      mode: "input",
      loading: false,
    }
  },
  methods: {
    boldenSuggestion(scope) {
      if (!scope) return scope;
      const { suggestion, query } = scope;
      let result = this.$refs.suggestComponent.displayProperty(suggestion);
      if (!query) return result;
      const texts = query.split(/[\s-_/\\|\.]/gm).filter(t => !!t) || [""];
      return result.replace(
        new RegExp("(.*?)(" + texts.join("|") + ")(.*?)", "gi"),
        "$1<span class='match'>$2</span>$3"
      );
    },
    handleSearch(value) {
      console.log(value)
    },
    onSuggestSelect(selected) { this.selected = selected },
    onRequestStart() { this.loading = true },
    onRequestDone() {  this.loading = false },
    onRequestFailed() { this.loading = false},
    getList(inputValue) {
      return new Promise((resolve, reject) => {
        // let url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${inputValue}`
        let url = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&namespace=*&search=${inputValue}&limit=10&namespace=0&format=json`;
        // this.$refs.suggestComponent.clearSuggestions()
        fetch(url)
          .then(response => {
            if (!response.ok) {
              reject();
            }
            response
              .json()
              .then(json => {
                let autocompleteText = json.shift();
                let result = [];
                const fields = ["text", "description", "link"];
                json.forEach((part, i) => {
                  part.forEach((el, j) => {
                    if (!result[j]) {
                      result.push({
                        id: j + 1
                      });
                    }
                    result[j][fields[i]] = el;
                  });
                });
                resolve(result);
                // resolve([...(json.items || [])])
              })
              .catch(e => {
                reject(e);
              });
          })
          .catch(error => {
            this.loading = false;
            reject(error);
          });
      });
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
}
.match {
  color: #FD3D76;
  // text-decoration: underline;
  font-weight: bold;
}
</style>