<template>
    <div class="theme">
        <svg-icon icon-class="thems" />
        <el-dropdown @command="changeTheme">
            <span class="el-dropdown-link">
                主题
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="default">
                    <svg-icon icon-class="defaultC"></svg-icon><span class="thems-list">默认</span>
                </el-dropdown-item>
                <el-dropdown-item command="lightBlue">
                    <svg-icon icon-class="jinse"></svg-icon><span class="thems-list">节庆</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    computed: {

    },
    methods: {
        changeTheme(command) {
            if (command == 'lightBlue') {
                this.addClass(document.body, 'custom-theme')
            } else {
                this.removeClass(document.body, 'custom-theme')
            }
        },
        addClass(element, className) {
            if (!element || !className) {
                return
            }
            let classString = element.className
            const nameIndex = classString.indexOf(className)
            if (nameIndex === -1) {
                classString += '' + className
            }
            element.className = classString
        },
        removeClass(element, className) {
            let classString = element.className
            const nameIndex = classString.indexOf(className)
            classString =
                classString.substr(0, nameIndex) +
                classString.substr(nameIndex + className.length)
            element.className = classString
        }
    }

}
</script>

<style lang="scss" scoped>
    .theme {
        display: inline-block;
        cursor: pointer;
        .el-icon-arrow-down {
            font-size: 12px;
        }
    }
    .thems-list{
        display: inline-block;
        margin-left: 5px
    }
</style>
