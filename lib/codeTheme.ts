export const barnCatThemeSSR = {
  name: 'Barn Cat',
  type: 'dark',
  colors: {
    focusBorder: '#212121',
    foreground: '#CCBA8D',
    descriptionForeground: '#CCBA8D',
    errorForeground: '#FF5C8F',
    'editor.background': '#212121',
    'editor.foreground': '#CCBA8D',
    'editor.selectionBackground': '#592032',
    'selection.background': '#FF5C8F',
    'sideBar.foreground': '#B3A37B',
    'sideBar.background': '#252525',
    'sideBar.border': '#212121',
    'sideBarSectionHeader.background': '#222222',
    'sideBarSectionHeader.foreground': '#BEBEBE',
    'sideBarTitle.foreground': '#BEBEBE',
    'scrollbar.shadow': '#212121',
    'statusBar.background': '#212121',
    'statusBar.border': '#212121',
    'statusBar.foreground': '#CCBA8D',
    'statusBar.debuggingBackground': '#CCBA8D',
    'statusBar.debuggingForeground': '#212121',
    'statusBar.noFolderBackground': '#212121',
    'statusBar.noFolderForeground': '#CCBA8D',
    'tab.activeBackground': '#212121',
    'tab.activeForeground': '#CCBA8D',
    'tab.inactiveBackground': '#292626',
    'tab.activeBorder': '#FF5C8F',
    'tab.inactiveForeground': '#665D46',
    'tab.hoverBackground': '#302E2E',
    'tab.border': '#212121',
    'panel.background': '#212121',
    'activityBar.background': '#212121',
    'activityBar.border': '#212121',
    'activityBar.foreground': '#CCBA8D',
    'activityBarBadge.background': '#424852',
    'titleBar.activeBackground': '#212121',
    'titleBar.activeForeground': '#CCBA8D',
    'titleBar.inactiveBackground': '#31343c',
    'titleBar.inactiveForeground': '#707C74',
    'list.hoverBackground': '#302E2E',
    'list.focusBackground': '#802E48',
    'list.activeSelectionBackground': '#802E48',
    'list.activeSelectionForeground': '#FAE48C',
    'list.focusForeground': '#CCBA8D',
    'list.inactiveSelectionBackground': '#4D1C2B',
    'list.inactiveSelectionForeground': '#B3A37B',
    'list.warningForeground': '#FF835C',
    'list.errorForeground': '#FF5C8F',
    'list.hoverForeground': '#CCBA8D',
    'list.highlightForeground': '#93a1a1',
    'list.inactiveFocusBackground': '#4D1C2B',
    'editorGroupHeader.tabsBackground': '#212121',
    'editorWidget.border': '#555',
    'editorWidget.background': '#282b31',
    'editorBracketMatch.background': '#212121',
    'editorBracketMatch.border': '#886b67',
    'editorSuggestWidget.background': '#212121',
    'editorSuggestWidget.selectedBackground': '#4D1C2B',
    'gitDecoration.ignoredResourceForeground': '#666060',
    'gitDecoration.modifiedResourceForeground': '#FAE48C',
  },
  tokenColors: [
    {
      name: 'Comment',
      scope: ['comment', 'punctuation.definition.comment'],
      settings: {
        fontStyle: 'italic',
        foreground: '#546E7A',
      },
    },
    {
      name: 'Variables',
      scope: [
        'variable',
        'string constant.other.placeholder',
        'constant.other.color',
        'meta.object-literal.key',
      ],
      settings: {
        foreground: '#F2A552',
      },
    },
    {
      name: 'Invalid',
      scope: ['invalid', 'invalid.illegal'],
      settings: {
        foreground: '#FF5370',
      },
    },
    {
      name: 'Keyword, Storage',
      scope: ['keyword', 'storage.type', 'storage.modifier'],
      settings: {
        foreground: '#9A69FF',
      },
    },
    {
      name: 'Operator, Misc',
      scope: [
        'keyword.control',
        'constant.other.color',
        'punctuation.separator.inheritance.php',
        'punctuation.section.embedded',
        'keyword.other.template',
        'keyword.other.substitution',
      ],
      settings: {
        foreground: '#FF5C8F',
      },
    },
    {
      name: 'Punctuation',
      scope: ['punctuation'],
      settings: {
        foreground: '#E68EA7',
      },
    },
    {
      name: 'Decorator',
      scope: ['meta.decorator entity.name.function'],
      settings: {
        foreground: '#D9869E',
      },
    },
    {
      name: 'HTML tags',
      scope: [
        'punctuation.definition.tag',
        'punctuation.definition.tag.html',
        'punctuation.definition.tag.begin.html',
        'punctuation.definition.tag.end.html',
      ],
      settings: {
        foreground: '#6F6F70',
      },
    },
    {
      name: 'Tag',
      scope: ['entity.name.tag', 'meta.tag.sgml', 'markup.deleted.git_gutter'],
      settings: {
        foreground: '#C75A5F',
      },
    },
    {
      name: 'Function, Special Method',
      scope: [
        'entity.name.function',
        'meta.function-call',
        'variable.function',
        'support.function',
        'keyword.other.special-method',
      ],
      settings: {
        foreground: '#27B3A8',
      },
    },
    {
      name: 'Function Declaration',
      scope: ['meta.definition.method entity.name.function'],
      settings: {
        foreground: '#32E6D7',
      },
    },
    {
      name: 'Block Level Variables',
      scope: ['meta.block variable.other', 'variable.parameter'],
      settings: {
        foreground: '#F2BC5E',
      },
    },
    {
      name: 'Block Level Variables',
      scope: ['meta.array.literal variable.other.readwrite'],
      settings: {
        foreground: '#FF835C',
      },
    },
    {
      name: "Block Level Variables' Properties",
      scope: ['variable.other.property'],
      settings: {
        foreground: '#73C4FF',
      },
    },
    {
      name: "Block Level Variables' Object Properties",
      scope: [
        'variable.other.object.property',
        'meta.var.expr variable.other.property',
        'meta.object-literal.key string.quoted.double',
      ],
      settings: {
        foreground: '#E6B25A',
      },
    },
    {
      name: 'Other Variable, String Link',
      scope: ['support.other.variable', 'string.other.link'],
      settings: {
        foreground: '#f07178',
      },
    },
    {
      name: 'Number, Constant, Function Argument, Tag Attribute, Embedded',
      scope: [
        'constant.numeric',
        'support.constant',
        'constant.character',
        'constant.escape',
        'keyword.other.unit',
        'keyword.other',
      ],
      settings: {
        foreground: '#F78C6C',
      },
    },
    {
      name: 'Number, Constant, Function Argument, Tag Attribute, Embedded',
      scope: ['constant.language'],
      settings: {
        foreground: '#3A9AF2',
      },
    },
    {
      name: 'String, Symbols, Inherited Class, Markup Heading',
      scope: [
        'constant.other.symbol',
        'constant.other.key',
        'entity.other.inherited-class',
        'markup.heading',
        'markup.inserted.git_gutter',
        'meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js',
      ],
      settings: {
        foreground: '#C3E88D',
      },
    },
    {
      name: 'Class, Support',
      scope: [
        'entity.name',
        'support.type',
        'support.class',
        'support.orther.namespace.use.php',
        'meta.use.php',
        'support.other.namespace.php',
        'markup.changed.git_gutter',
        'support.type.sys-types',
      ],
      settings: {
        foreground: '#FF835C',
      },
    },
    {
      name: 'CSS Class and Support',
      scope: [
        'source.css support.type.property-name',
        'source.sass support.type.property-name',
        'source.scss support.type.property-name',
        'source.less support.type.property-name',
        'source.stylus support.type.property-name',
        'source.postcss support.type.property-name',
      ],
      settings: {
        foreground: '#F2A552',
      },
    },
    {
      name: 'Sub-methods',
      scope: [
        'entity.name.module.js',
        'variable.import.parameter.js',
        'variable.other.class.js',
      ],
      settings: {
        foreground: '#FF5370',
      },
    },
    {
      name: 'Language methods',
      scope: ['variable.language'],
      settings: {
        fontStyle: 'italic',
        foreground: '#FF5370',
      },
    },
    {
      name: 'entity.name.method.js',
      scope: ['entity.name.method.js'],
      settings: {
        fontStyle: 'italic',
        foreground: '#82AAFF',
      },
    },
    {
      name: 'meta.method.js',
      scope: [
        'meta.class-method.js entity.name.function.js',
        'variable.function.constructor',
      ],
      settings: {
        foreground: '#82AAFF',
      },
    },
    {
      name: 'Attributes',
      scope: ['entity.other.attribute-name'],
      settings: {
        foreground: '#CE8567',
      },
    },
    {
      name: 'HTML Attributes',
      scope: [
        'text.html.basic entity.other.attribute-name.html',
        'text.html.basic entity.other.attribute-name',
      ],
      settings: {
        fontStyle: 'italic',
        foreground: '#FFCB6B',
      },
    },
    {
      name: 'CSS Classes',
      scope: ['entity.other.attribute-name.class'],
      settings: {
        foreground: '#FFCB6B',
      },
    },
    {
      name: "CSS ID's",
      scope: ['source.sass keyword.control'],
      settings: {
        foreground: '#82AAFF',
      },
    },
    {
      name: 'Inserted',
      scope: ['markup.inserted'],
      settings: {
        foreground: '#C3E88D',
      },
    },
    {
      name: 'Deleted',
      scope: ['markup.deleted'],
      settings: {
        foreground: '#FF5370',
      },
    },
    {
      name: 'Changed',
      scope: ['markup.changed'],
      settings: {
        foreground: '#C792EA',
      },
    },
    {
      name: 'Regular Expressions',
      scope: ['string.regexp'],
      settings: {
        foreground: '#89DDFF',
      },
    },
    {
      name: 'Escape Characters',
      scope: ['constant.character.escape'],
      settings: {
        foreground: '#89DDFF',
      },
    },
    {
      name: 'URL',
      scope: ['*url*', '*link*', '*uri*'],
      settings: {
        fontStyle: 'underline',
      },
    },
    {
      name: 'Decorators',
      scope: [
        'tag.decorator.js entity.name.tag.js',
        'tag.decorator.js punctuation.definition.tag.js',
      ],
      settings: {
        fontStyle: 'italic',
        foreground: '#82AAFF',
      },
    },
    {
      name: 'ES7 Bind Operator',
      scope: [
        'source.js constant.other.object.key.js string.unquoted.label.js',
      ],
      settings: {
        fontStyle: 'italic',
        foreground: '#FF5370',
      },
    },
    {
      name: 'JSON Key - Level 0',
      scope: [
        'source.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#FF835C',
      },
    },
    {
      name: 'JSON Key - Level 1',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#F2A552',
      },
    },
    {
      name: 'JSON Key - Level 2',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#F78C6C',
      },
    },
    {
      name: 'JSON Key - Level 3',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#FF5370',
      },
    },
    {
      name: 'JSON Key - Level 4',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#C17E70',
      },
    },
    {
      name: 'JSON Key - Level 5',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#82AAFF',
      },
    },
    {
      name: 'JSON Key - Level 6',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#f07178',
      },
    },
    {
      name: 'JSON Key - Level 7',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#C792EA',
      },
    },
    {
      name: 'JSON Key - Level 8',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#C3E88D',
      },
    },
    {
      name: 'Markdown - Plain',
      scope: [
        'text.html.markdown',
        'punctuation.definition.list_item.markdown',
      ],
      settings: {
        foreground: '#EEFFFF',
      },
    },
    {
      name: 'Markdown - Markup Raw Inline',
      scope: ['text.html.markdown markup.inline.raw.markdown'],
      settings: {
        foreground: '#C792EA',
      },
    },
    {
      name: 'Markdown - Markup Raw Inline Punctuation',
      scope: [
        'text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown',
      ],
      settings: {
        foreground: '#65737E',
      },
    },
    {
      name: 'Markdown - Heading',
      scope: [
        'markdown.heading',
        'markup.heading | markup.heading entity.name',
        'markup.heading.markdown punctuation.definition.heading.markdown',
      ],
      settings: {
        foreground: '#C3E88D',
      },
    },
    {
      name: 'Markup - Italic',
      scope: ['markup.italic'],
      settings: {
        fontStyle: 'italic',
        foreground: '#f07178',
      },
    },
    {
      name: 'Markup - Bold',
      scope: ['markup.bold', 'markup.bold string'],
      settings: {
        fontStyle: 'bold',
        foreground: '#f07178',
      },
    },
    {
      name: 'Markup - Bold-Italic',
      scope: [
        'markup.bold markup.italic',
        'markup.italic markup.bold',
        'markup.quote markup.bold',
        'markup.bold markup.italic string',
        'markup.italic markup.bold string',
        'markup.quote markup.bold string',
      ],
      settings: {
        fontStyle: 'bold',
        foreground: '#f07178',
      },
    },
    {
      name: 'Markup - Underline',
      scope: ['markup.underline'],
      settings: {
        fontStyle: 'underline',
        foreground: '#F78C6C',
      },
    },
    {
      name: 'Markdown - Blockquote',
      scope: ['markup.quote punctuation.definition.blockquote.markdown'],
      settings: {
        foreground: '#65737E',
      },
    },
    {
      name: 'Markup - Quote',
      scope: ['markup.quote'],
      settings: {
        fontStyle: 'italic',
      },
    },
    {
      name: 'Markdown - Link',
      scope: ['string.other.link.title.markdown'],
      settings: {
        foreground: '#82AAFF',
      },
    },
    {
      name: 'Markdown - Link Description',
      scope: ['string.other.link.description.title.markdown'],
      settings: {
        foreground: '#C792EA',
      },
    },
    {
      name: 'Markdown - Link Anchor',
      scope: ['constant.other.reference.link.markdown'],
      settings: {
        foreground: '#FFCB6B',
      },
    },
    {
      name: 'Markup - Raw Block',
      scope: ['markup.raw.block'],
      settings: {
        foreground: '#C792EA',
      },
    },
    {
      name: 'Markdown - Raw Block Fenced',
      scope: ['markup.raw.block.fenced.markdown'],
      settings: {
        foreground: '#00000050',
      },
    },
    {
      name: 'Markdown - Fenced Bode Block',
      scope: ['punctuation.definition.fenced.markdown'],
      settings: {
        foreground: '#00000050',
      },
    },
    {
      name: 'Markdown - Fenced Bode Block Variable',
      scope: [
        'markup.raw.block.fenced.markdown',
        'variable.language.fenced.markdown',
        'punctuation.section.class.end',
      ],
      settings: {
        foreground: '#EEFFFF',
      },
    },
    {
      name: 'Markdown - Fenced Language',
      scope: ['variable.language.fenced.markdown'],
      settings: {
        foreground: '#65737E',
      },
    },
    {
      name: 'Markdown - Separator',
      scope: ['meta.separator'],
      settings: {
        fontStyle: 'bold',
        foreground: '#65737E',
      },
    },
    {
      name: 'Markup - Table',
      scope: ['markup.table'],
      settings: {
        foreground: '#EEFFFF',
      },
    },
  ],
};
