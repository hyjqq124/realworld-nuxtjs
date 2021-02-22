/**
 * 验证是否登录的中间件
 * 想给谁使用就在该页面设置
*/

export default function ({ store, redirect }) {
    if(!store.state.user) {
        return redirect('/login')
    }
}