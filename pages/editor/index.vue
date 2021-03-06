<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit" onkeydown='if(event.keyCode == 13) return false'>
            <fieldset>
              <fieldset class="form-group">
                  <input v-model="article.title" required type="text" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                  <input v-model="article.description" required type="text" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                  <textarea v-model="article.body" required class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input v-model="tag" @keydown="createTag" type="text" class="form-control" placeholder="Enter tags">
                  <div class="tag-list">
                    <span class="tag-default tag-pill" v-for="(tag, index) in article.tagList" :key="index">
                      <i class="ion-close-round" @click="delTag(index)"></i>
                      {{tag}}
                    </span>
                  </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticle, updateArticle } from '@/api/article'
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: 'EditorIndex',
  data () {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      tag: '',
      slug: ''
    }
  },
  mounted() {
    let { slug } = this.$route.params
    if (slug) {
      this.slug = slug
      this.getDetail(slug)
    }
  },
  methods: {
    async getDetail(slug) {
      getArticle(slug).then(res => {
        this.article.title = res.data.article.title
        this.article.description = res.data.article.description
        this.article.body = res.data.article.body
        this.article.tagList = res.data.article.tagList
      })
    },
    async onSubmit() {
      if (this.slug) {
        updateArticle(this.slug, {article: this.article}).then(res => {
          let { slug } = res.data.article
          this.$router.replace(`/article/${slug}`)
        })
      } else {
        createArticle({ article: this.article }).then(res => {
          let { slug } = res.data.article
          this.$router.replace(`/article/${slug}`)
        })
      }
    },
    createTag(e) {
      if(e.keyCode == 13) {
        this.tag && this.article.tagList.push(this.tag)
        this.tag = ''
      }
    },
    delTag(index) {
      this.article.tagList.splice(index, 1)
    }
  }
}
</script>

<style>

</style>
