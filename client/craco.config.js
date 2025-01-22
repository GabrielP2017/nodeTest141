const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        fallback: {
          http: require.resolve("stream-http"),
          https: require.resolve("https-browserify"),
          os: require.resolve("os-browserify/browser"),
          stream: require.resolve("stream-browserify"),
          util: require.resolve("util/"),
          zlib: require.resolve("browserify-zlib"),
          path: require.resolve("path-browserify"),
          buffer: require.resolve("buffer/"), // Buffer 폴리필
          querystring: require.resolve("querystring-es3"), // querystring 폴리필 추가
          crypto: require.resolve("crypto-browserify"), // crypto 폴리필 추가
          process: require.resolve("process/browser"), // process 폴리필 추가
          fs: false, // 브라우저에서 사용 불가
          net: false, // 브라우저에서 사용 불가
        },
      };

      // 추가적인 module.rules 설정
      webpackConfig.module = {
        ...webpackConfig.module,
        rules: [
          ...(webpackConfig.module.rules || []),
          {
            test: /\.m?js$/,
            resolve: {
              fullySpecified: false,  // mjs 파일에서 경로가 명확히 지정되지 않으면 에러를 발생시키지 않음
            },
          },
        ],
      };
      
      return webpackConfig;
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"], // Buffer 글로벌 변수 설정
        process: "process/browser", // Node.js process 변수 설정
      }),
    ],
  },
  externals: {
    express: 'commonjs express',  // express를 클라이언트 번들에서 제외
  },
};
