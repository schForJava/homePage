
<template>
    <!-- eslint-disable vue/require-component-is -->
    <component v-bind="linkProps(to == '/wiki/doc' ? this.$api.wikiPathUrl : to)" @click.stop.self="aa">
        <slot />
    </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
    props: {
        to: {
            type: String,
            required: true
        }
    },
    methods: {
        linkProps(url) {
            if (isExternal(url)) {
                return {
                    is: 'a',
                    href: url,
                    target: '_blank',
                    rel: 'noopener'
                }
            }
            return {
                is: 'router-link',
                to: url
            }
        },
        aa(e) {
            e.stopPropagation()
            return false
        }
    }
}
</script>
