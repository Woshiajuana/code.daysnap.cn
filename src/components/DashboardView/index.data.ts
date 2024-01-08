// import { useData } from 'vitepress'
// import { } from '../'

interface APIHeader {
  anchor: string
  text: string
}

export interface APIGroup {
  text: string
  anchor: string
  items: {
    text: string
    link: string
    headers: APIHeader[]
  }[]
}

// auto generator
export declare const data: any[]

// https://vitepress.dev/zh/guide/data-loading#basic-usage
export default {
  watch: './*.md',
  load () {
    return []
  }
}