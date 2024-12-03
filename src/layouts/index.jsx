import React, { useEffect, useState, Suspense } from 'react'
import { Layout, Menu, Avatar, Button, Popover, Space, FloatButton, Typography, Breadcrumb } from 'antd'
import { Outlet, Link, useLocation } from 'react-router-dom'
import * as Icon from '@ant-design/icons'
import useStore from '../store'
import styles from './index.scss'

const LayoutAdmin = () => {
	const { pathname } = useLocation()
	const [avatar] = useState(`https://api.multiavatar.com/${Math.random()}.svg`)
	const [menus, setMenus] = useState([])
	const { userInfo, handleLogout } = useStore()

	// 菜单设置
	const formatMenus = () => {
		return [
			{
				label: '主页1',
				key: 'homeGroup',
				type: 'group',
				children: [
					{
						label: <Link to="/web/home">主页</Link>,
						key: '/web/home',
						icon: '',
					},
				],
			},
		]
	}

	useEffect(() => {
		setMenus(formatMenus())
	}, [])

	return (
		<Layout style={{ height: '100%' }}>
			<Layout hasSider className={styles.body}>
				<Layout.Sider width={176} collapsed={false} collapsedWidth={0} className={styles.sider}>
					<div className={styles.logo}>
						<img src={require('@/assets/images/logo.png')} />
					</div>
					<Menu mode="inline" theme={'light'} items={menus} selectedKeys={[pathname]} />
				</Layout.Sider>

				<Layout.Content className={styles.page}>
					<Layout.Header className={styles.header}>
						<div></div>
						<Space size="large">
							<Typography.Link
								type="secondary"
								target="_blank"
								rel="noreferrer"
								href="https://docs.changdu.vip/pages/viewpage.action?pageId=37831520">
								<Space size="small">
									<Icon.QuestionCircleOutlined />
									帮助文档
								</Space>
							</Typography.Link>
							<Popover
								placement="bottomRight"
								trigger="click"
								overlayInnerStyle={{ padding: 0 }}
								content={
									<Button type="text" onClick={handleLogout}>
										退出登录
									</Button>
								}>
								<Space>
									<Typography.Text>{userInfo?.name || ''}</Typography.Text>
									<Avatar className={styles.avatar} src={avatar} crossOrigin="anonymous" />
								</Space>
							</Popover>
						</Space>
					</Layout.Header>
					<Layout>
						<Layout.Content className={styles.content} id="content">
							<Suspense fallback={<div />}>
								<Outlet />
							</Suspense>
							<FloatButton.BackTop target={() => document.getElementById('content') || document.body} />
						</Layout.Content>
					</Layout>
				</Layout.Content>
			</Layout>
		</Layout>
	)
}

export default LayoutAdmin
