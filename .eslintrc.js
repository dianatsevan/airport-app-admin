module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
      "browser": true
    },
    "plugins": [
      "import",
      "jsx-a11y",
      "react"
    ],
    "rules": {
      "array-callback-return": "off",
      "consistent-return": "off",
      "import/extensions": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-unresolved": "off",
      "linebreak-style": "off",
      "max-len": ["error", {
        "code": 350,
        "ignoreComments": true,
        "ignoreRegExpLiterals": true,
        "ignoreUrls": true,
        "tabWidth": 2
      }],
      "no-plusplus": "off",
      "no-param-reassign": "off",
      "no-underscore-dangle": "warn",
      "no-unused-expressions": ["error", { "allowTaggedTemplates": true }],
      "react/destructuring-assignment": "off",
      "react/forbid-prop-types": "off",
      "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx"] }],
      "react/jsx-one-expression-per-line": "off",
      "react/no-array-index-key": "off",
      "react/no-did-mount-set-state": "warn",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/label-has-for": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
      "jsx-a11y/no-static-element-interactions": "off"
    }
};