/**
 * nuxt 配置文件
 *
 */

module.exports = {
    router: {
        linkActiveClass: 'active',
        extendRoutes(routes, resolve) {
            // 清空自动生成的路由表
            routes.splice(0);

            // 根据自己的需求添加路由表，更加灵活
            routes.push(
                ...[
                    {
                        path: "/",
                        component: resolve(__dirname, "pages/layout/"),
                        children: [
                            {
                                name: "home",
                                path: "",
                                component: resolve(__dirname, "pages/home/"),
                            },
                            {
                                name: "login",
                                path: "/login",
                                component: resolve(__dirname, "pages/login/"),
                            },
                            {
                                name: "register",
                                path: "/register",
                                component: resolve(__dirname, "pages/login/"),
                            },
							{
								name: 'profile',
								path: '/profile',
								component: resolve(__dirname, 'pages/profile/')
							},
							{
								name: 'setings',
								path: '/settings',
								component: resolve(__dirname, 'pages/settings/')
							},
							{
								name: 'editor',
								path: '/editor',
								component: resolve(__dirname, 'pages/editor/')
							},
							{
								name: 'article',
								path: '/article',
								component: resolve(__dirname, 'pages/article/')
							}
                        ],
                    },
                ]
            );
        },
    },
};
