// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';


// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Let me think!',
  tagline: 'A blog about software development and other things',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://wuguipeng.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'wuguipeng', // Usually your GitHub org/user name.
  projectName: 'blog', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        // {
        //   routeBasePath: '/docs',
        //   sidebarPath: './sidebars.js',
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   // editUrl:
        //   //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //   // remarkPlugins: [remarkMath],
        //   // rehypePlugins: [
        //   //   rehypeKatex
        //   // ],
        // },
        blog: {
          blogTitle: 'Let me think!',
          blogDescription: 'A blog about software development and other things',
          // blogListComponent: '@theme/BlogArchivePage',
          postsPerPage: 10,
          routeBasePath: '/',
          showReadingTime: false,
          // readingTime: ({content, frontMatter, defaultReadingTime}) =>
          //   defaultReadingTime({content, options: {wordsPerMinute: 300}}),
          // feedOptions: {
          //   type: ['rss', 'atom'],
          //   xslt: true,
          // },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          // onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          remarkPlugins: [remarkMath],
          rehypePlugins: [
            rehypeKatex
          ],
          blogSidebarCount: "ALL",
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Let me think!',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: '文档',
          // },
          // { to: '/blog', label: '博客', position: 'left' },
          {
            href: 'https://github.com/wuguipeng',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      blog: {
        sidebar: {
          groupByYear: true,
        },
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Docs',
          //   items: [
          //     {
          //       label: '文档',
          //       to: '/docs',
          //     },
          //   ],
          // },
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Github',
          //       href: 'https://github.com/wuguipeng',
          //     }
          //   ],
          // },
          // {
          //   title: 'More',
          //   items: [
          //     {
          //       label: '归档',
          //       to: '/archive',
          //     },
          //   ],
          // },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
