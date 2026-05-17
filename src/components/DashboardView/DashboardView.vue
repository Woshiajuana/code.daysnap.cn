<template>
  <div class="dashboard-wrap">
    <header class="header-section">
      <h1>{{ title }}</h1>
      <label class="search-box">
        <span>筛选</span>
        <input v-model="keyword" type="search" placeholder="请填写关键词" />
      </label>
    </header>

    <section
      class="dashboard-section"
      v-for="(list, index) in data"
      :key="index"
    >
      <h2 v-if="!maps[path]">
        {{ list.text }}
        <span>（{{ list.count }}篇）</span>
      </h2>
      <div class="dashboard-content">
        <dl
          class="dashboard-group"
          v-for="(group, index) in list.items"
          :key="index"
        >
          <dt v-if="group.text">{{ group.text }}</dt>
          <dd v-for="(item, index) in group.items" :key="index">
            <a v-if="item.link" :href="withBase(item.link)">{{ item.text }}</a>
          </dd>
        </dl>
      </div>
    </section>

    <p v-if="!data.length" class="no-match">没有搜索到 "{{ keyword }}" .</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from "vue";
import { withBase, useData, useRoute } from "vitepress";
import type { filed } from "./types";

defineProps({
  title: {
    type: String,
    default: "",
  },
});

const { theme } = useData<{
  sidebar: Record<string, any>;
  nav: any[];
}>();

const { path } = useRoute();
const maps = computed(() => {
  const { nav } = theme.value;
  let res = nav.reduce<Record<string, string>>((res, item) => {
    const { items } = item;
    if (items) {
      items.forEach(({ text, link }) => {
        res[link] = text;
      });
    }
    return res;
  }, {});

  if (res[path]) {
    return { [path]: res[path] };
  }

  return res;
});

const source = computed<filed[]>(() => {
  const sidebar = JSON.parse(JSON.stringify(theme.value.sidebar));

  const data = Object.keys(sidebar)
    .filter((key) => !!maps.value[key])
    .map((key) => {
      const { text = maps.value[key], items } = sidebar[key][0];
      const defGroup: filed = { text: "", items: [], count: 0 };
      const groups = items.filter((item: any) => {
        if (!item.items) {
          defGroup.items.push(item);
          return false;
        }
        return true;
      });
      defGroup.count = defGroup.items.length;
      groups.forEach(
        (group: { count: any; items: string | any[] }) =>
          (group.count = group.items.length)
      );

      const allGroups = [defGroup, ...groups];

      return {
        text,
        items: allGroups,
        count: allGroups.reduce((res, item) => res + item.count, 0),
      };
    });

  return data;
});

const keyword = ref("");
const data = computed(() => {
  if (!keyword.value) {
    return source.value;
  }

  const reg = new RegExp(`${keyword.value}`, "i");

  return source.value
    .map((list) => {
      const items = list
        .items!.map((group) => {
          const items =
            group.items?.filter((item) => reg.test(item.text)) ?? [];

          return { ...group, items, count: items.length };
        })
        .filter((item) => item.count);

      return {
        ...list,
        items,
        count: items.reduce((res, item) => res + item.count, 0),
      };
    })
    .filter((item) => item.items.length);
});
</script>

<style scoped lang="scss">
.dark {
  .dashboard-wrap {
    --vt-c-bg-soft: #242424;
    --vt-c-text-code: #aac8e4;
  }
}
.dashboard-wrap {
  max-width: 1024px;
  margin: 0 auto;
  padding: 64px 32px;

  --vt-c-bg-soft: #f9f9f9;
  --vt-c-divider: rgba(60, 60, 60, 0.29);
  --vt-c-divider-light: rgba(60, 60, 60, 0.12);
  --vt-c-text-3: rgba(60, 60, 60, 0.33);
  --vt-c-green: #42b883;
  --vt-c-text-code: #476582;

  h1,
  h2,
  h3 {
    font-weight: 600;
    line-height: 1;
  }

  h1,
  h2 {
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: 38px;
  }

  h2 {
    font-size: 24px;
    color: var(--vt-c-text-1);
  }

  h3 {
    letter-spacing: -0.01em;
    color: var(--vt-c-green);
    font-size: 18px;
    margin-bottom: 1em;
    transition: color 0.5s;
  }
}

.header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  input {
    border: 1px solid var(--vt-c-divider);
    border-radius: 8px;
    padding: 6px 12px;
    transition: box-shadow 0.25s ease;
    outline-offset: -2px;
    background-color: transparent;
    &:focus {
      box-shadow: 0 0 4pt #00d47499;
    }
  }
}

.dashboard-section {
  margin-top: 36px;
  padding-bottom: 36px;
  border-top: 1px solid var(--vt-c-divider-light);
  span {
    font-size: 16px;
    color: #999;
  }
  h2{
    padding-top: 36px;
  }
}
.dashboard-content {
  margin-top: 36px;
}
.dashboard-group {
  margin: 0;
  break-inside: avoid;
  overflow: auto;
  margin-bottom: 20px;
  background-color: var(--vt-c-bg-soft);
  border-radius: 8px;
  padding: 24px 28px;
  transition: background-color 0.5s;
  dt {
    letter-spacing: -0.01em;
    color: var(--vt-c-green);
    font-size: 18px;
    margin-bottom: 1em;
    transition: color 0.5s;
    font-weight: 600;
  }
  dd {
    margin-left: 0;
  }
  a {
    font-size: 15px;
    font-weight: 500;
    line-height: 2;
    color: var(--vt-c-text-code);
    transition: color 0.5s;
    &:hover {
      color: var(--vt-c-green);
    }
  }
}

.no-match {
  font-size: 1.2em;
  color: var(--vt-c-text-3);
  border-top: 1px solid var(--vt-c-divider-light);
  text-align: center;
  margin-top: 36px;
  padding: 72px 0;
}

@media (min-width: 768px) {
  .dashboard-content {
    columns: 2;
  }
}

@media (min-width: 1024px) {
  .dashboard-content {
    columns: 3;
  }
}
</style>
