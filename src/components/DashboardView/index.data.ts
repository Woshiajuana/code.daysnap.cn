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

export default {
  watch: './*.md',
  load () {
    return []
  }
}