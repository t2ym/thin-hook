/* @exclude */
/*
@license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
Copyright (c) 2017, 2018, 2019, 2020 Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* @endexclude */
const wildcardWhitelist = [
  new RegExp('^at (.* [(])?' + origin + '/components/'), // trust the site contents including other components
  new RegExp('^at ([^(]* [(])?' + 'https://cdnjs.cloudflare.com/ajax/libs/vis/4[.]18[.]1/vis[.]min[.]js'),
  new RegExp('^at ([^(]* [(])?' + 'https://www.gstatic.com/charts/loader[.]js'),
  new RegExp('^at ([^(]* [(])?' + 'https://apis.google.com/js/api[.]js'),
];