<template>
    <div class="show header-search">
        <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />
        <el-select
            ref="headerSearchSelect"
            v-model="search"
            :remote-method="querySearch"
            filterable
            default-first-option
            remote
            placeholder="请输入关键字"
            popper-class="header-search-select"
            @change="change"
        >
            <el-option v-for="item in options" :key="item.path" :value="item" :label="item.title.join(' > ')" />
        </el-select>
    </div>
</template>

<script>
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from 'fuse.js'
import path from 'path'

export default {
    name: 'HeaderSearch',
    data() {
        return {
            search: '',
            options: [],
            searchPool: [],
            show: true,
            fuse: undefined
        }
    },
    computed: {
        routes() {
            return this.$store.getters.permission_routes
        }
    },
    watch: {
        routes() {
            this.searchPool = this.generateRoutes(this.routes)
        },
        searchPool(list) {
            this.initFuse(list)
        },
        show(value) {
            if (value) {
                document.body.addEventListener('click', this.close)
            } else {
                document.body.removeEventListener('click', this.close)
            }
        }
    },
    mounted() {
        this.searchPool = this.generateRoutes(this.routes)
    },
    methods: {
        click() {
            // this.show = !this.show
            // if (this.show) {
            //   this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
            // }
        },
        close() {
            // this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
            // this.options = []
            // this.show = false
        },
        change(val) {
            this.$router.push(val.path)
            this.search = ''
            this.options = []
            this.$nextTick(() => {
                this.show = true
            })
        },
        initFuse(list) {
            this.fuse = new Fuse(list, {
                shouldSort: true,
                threshold: 0.4,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: [{
                    name: 'title',
                    weight: 0.7
                }, {
                    name: 'path',
                    weight: 0.3
                }]
            })
        },
        // Filter out the routes that can be displayed in the sidebar
        // And generate the internationalized title
        generateRoutes(routes, basePath = '/', prefixTitle = []) {
            let res = []

            for (const router of routes) {
                // skip hidden router
                if (router.hidden) { continue }

                const data = {
                    path: path.resolve(basePath, router.path),
                    title: [...prefixTitle]
                }

                if (router.meta && router.meta.title) {
                    data.title = [...data.title, router.meta.title]

                    if (router.redirect !== 'noRedirect') {
                        // only push the routes with title
                        // special case: need to exclude parent router without redirect
                        res.push(data)
                    }
                }

                // recursive child routes
                if (router.children) {
                    const tempRoutes = this.generateRoutes(router.children, data.path, data.title)
                    if (tempRoutes.length >= 1) {
                        res = [...res, ...tempRoutes]
                    }
                }
            }
            return res
        },
        querySearch(query) {
            if (query !== '') {
                this.options = this.fuse.search(query)
            } else {
                this.options = []
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.header-search {
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;

  .search-icon {
    cursor: pointer;
    font-size: 14px;
    color: #d5d9e4;
    position: absolute;
    top: 8px;
    right: 14px;
    z-index: 2;
  }

  .header-search-select {
    width: calc(100% - 0px) !important;
    .el-input__inner{
        padding-left: 40px !important;
    }
  }

}
</style>
