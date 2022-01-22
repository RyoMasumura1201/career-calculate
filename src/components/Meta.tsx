import Head from 'next/head';

export const Meta: React.VFC = () => {
  return (
    <Head>
      <title>経歴年度計算</title>
      <meta name='description' content='経歴年度を計算する' />
      <link
        rel='icon'
        href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>📰</text></svg>'
      />
      <link
        rel='icon alternate'
        type='image/png'
        href='https://twemoji.maxcdn.com/v/13.1.0/72x72/1f4f0.png'
      />
      <meta name='og:title' content='経歴年度計算' />
      <meta property='og:description' content='経歴年度を計算する' />
      <meta property='og:image' content='https://career-calculate.vercel.app/public/ogp.png' />
      <meta name='twitter:card' content='summary_large_image' />
    </Head>
  );
};
