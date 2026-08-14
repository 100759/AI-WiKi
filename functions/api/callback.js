// Cloudflare Pages Functions - OAuth 回调
// GitHub 重定向回此处，用 code 交换 access_token，再通过 postMessage 传给 CMS
// 环境变量: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET

function renderBody(status, content) {
  const html = `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify(content)}',
          message.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
  `
  return new Blob([html])
}

export async function onRequest(context) {
  const { request, env } = context

  const client_id = env.GITHUB_CLIENT_ID
  const client_secret = env.GITHUB_CLIENT_SECRET

  if (!client_id || !client_secret) {
    return new Response('GITHUB_CLIENT_ID 或 GITHUB_CLIENT_SECRET 环境变量未配置', {
      status: 500
    })
  }

  try {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')

    if (!code) {
      return new Response('缺少授权码 code 参数', { status: 400 })
    }

    // 用 code 向 GitHub 交换 access_token
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'cloudflare-pages-decap-oauth',
        accept: 'application/json'
      },
      body: JSON.stringify({ client_id, client_secret, code })
    })

    const result = await response.json()

    if (result.error) {
      return new Response(renderBody('error', result), {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
        status: 401
      })
    }

    const token = result.access_token
    const provider = 'github'
    const responseBody = renderBody('success', { token, provider })

    return new Response(responseBody, {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
      status: 200
    })
  } catch (error) {
    console.error(error)
    return new Response(error.message, {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
      status: 500
    })
  }
}
