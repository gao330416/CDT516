import React, { useState, useEffect } from 'react'
import { ConfigProvider, Button, Card, Typography, Row, Col, Statistic, Avatar, Badge, Progress, Steps, Timeline, Table, Tag, Rate, Space, Alert, Drawer, List, Tabs, Input, Select, Form, Modal, notification, Menu, Layout, Image, Collapse, Tooltip, Popover } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { 
  MedicineBoxOutlined, 
  UserOutlined, 
  ShoppingCartOutlined, 
  SafetyCertificateOutlined, 
  BarChartOutlined, 
  CreditCardOutlined,
  TeamOutlined,
  HeartOutlined,
  StarOutlined,
  RobotOutlined,
  MobileOutlined,
  SyncOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  EditOutlined,
  SettingOutlined,
  CrownOutlined,
  BellOutlined,
  FireOutlined,
  RocketOutlined,
  QrcodeOutlined,
  FileTextOutlined,
  DashboardOutlined,
  LogoutOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  UploadOutlined,
  DeleteOutlined,
  SaveOutlined,
  SendOutlined,
  MessageOutlined,
  PhoneOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined as CheckIcon,
  CloseCircleOutlined,
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography
const { Step } = Steps
const { TabPane } = Tabs
const { Header, Content, Sider } = Layout
const { Panel } = Collapse

// 角色类型
type UserRole = 'patient' | 'dietitian' | 'admin'

// 患者数据
const patientData = {
  profile: {
    name: '张三',
    age: 45,
    room: '301A',
    diagnosis: '2型糖尿病',
    allergies: '海鲜过敏',
    dietPlan: '低糖低脂',
    doctor: '王医生'
  },
  orders: [
    { id: 'P001', date: '2024-01-15', meal: '糖尿病早餐', status: '已完成', rating: 5 },
    { id: 'P002', date: '2024-01-15', meal: '糖尿病午餐', status: '配送中', rating: null },
    { id: 'P003', date: '2024-01-14', meal: '糖尿病晚餐', status: '已完成', rating: 4 },
  ],
  nutrition: {
    dailyCalories: 1800,
    protein: 90,
    carbs: 180,
    fat: 60,
    sugar: 45
  },
  recommendations: [
    '建议增加蔬菜摄入量',
    '减少精制糖类食物',
    '定时定量进餐'
  ]
}

// 营养师数据
const dietitianData = {
  patients: [
    { id: 'P001', name: '张三', room: '301A', diagnosis: '2型糖尿病', status: '待审核', plan: '低糖低脂' },
    { id: 'P002', name: '李四', room: '205B', diagnosis: '高血压', status: '已通过', plan: '低盐' },
    { id: 'P003', name: '王五', room: '108C', diagnosis: '术后恢复', status: '待审核', plan: '高蛋白' },
  ],
  nutritionPlans: [
    { id: 'N001', name: '糖尿病标准餐', calories: 1800, protein: 90, carbs: 180, fat: 60 },
    { id: 'N002', name: '高血压低盐餐', calories: 2000, protein: 100, carbs: 200, fat: 70 },
    { id: 'N003', name: '术后高蛋白餐', calories: 2200, protein: 120, carbs: 220, fat: 80 },
  ],
  pendingReviews: 5,
  approvedToday: 12
}

// 管理员数据
const adminData = {
  stats: {
    totalOrders: 1256,
    totalRevenue: 125800,
    activePatients: 89,
    satisfaction: 4.8,
    safetyScore: 98.5,
    systemUptime: 99.9
  },
  orders: [
    { id: 'A001', patient: '张三', room: '301A', meal: '糖尿病套餐', amount: 45, status: '已完成', time: '12:30' },
    { id: 'A002', patient: '李四', room: '205B', meal: '低盐套餐', amount: 38, status: '配送中', time: '11:45' },
    { id: 'A003', patient: '王五', room: '108C', meal: '高蛋白套餐', amount: 52, status: '准备中', time: '13:15' },
  ],
  alerts: [
    { type: 'warning', message: '库存不足：西兰花', time: '10:30' },
    { type: 'info', message: '新患者注册：赵六', time: '09:15' },
    { type: 'success', message: '系统备份完成', time: '08:00' },
  ]
}

// 角色选择页面
function RoleSelection({ onRoleSelect }: { onRoleSelect: (role: UserRole) => void }) {
  const roles = [
    { 
      key: 'patient' as UserRole, 
      name: '患者', 
      icon: <UserOutlined />, 
      color: '#52c41a',
      description: '查看个人营养方案、订餐、评价'
    },
    { 
      key: 'dietitian' as UserRole, 
      name: '营养师', 
      icon: <TeamOutlined />, 
      color: '#1890ff',
      description: '审核营养方案、管理患者档案'
    },
    { 
      key: 'admin' as UserRole, 
      name: '管理员', 
      icon: <CrownOutlined />, 
      color: '#722ed1',
      description: '系统管理、数据分析、运营监控'
    }
  ]

  return (
    <div style={{ 
      backgroundImage: 'url(/imgs/4.png), linear-gradient(135deg, #E6F7F7 0%, #f0f9ff 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundBlendMode: 'overlay',
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.3)',
        zIndex: 0
      }} />
      <Card style={{ 
        width: '100%', 
        maxWidth: 1000, 
        textAlign: 'center',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        padding: '20px',
        position: 'relative',
        zIndex: 1,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)'
      }}>
        <Title level={1} style={{ color: '#1E50B3', marginBottom: 8, fontSize: '28px' }}>
          🏥 医院订餐SaaS系统
        </Title>
        <Paragraph style={{ fontSize: 16, marginBottom: 32, color: '#666' }}>
          请选择您的身份角色进入相应系统
        </Paragraph>
        
        <Row gutter={[24, 24]} justify="center" style={{ width: '100%' }}>
          {roles.map(role => (
            <Col xs={24} sm={24} md={8} lg={8} key={role.key} style={{ minWidth: '200px' }}>
              <Card
                hoverable
                style={{ 
                  textAlign: 'center', 
                  border: `2px solid ${role.color}`,
                  transition: 'all 0.3s ease',
                  borderRadius: '12px',
                  minHeight: '300px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: `linear-gradient(135deg, ${role.color}15 0%, ${role.color}05 100%)`,
                  overflow: 'visible'
                }}
                bodyStyle={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'stretch',
                  height: '100%',
                  padding: '20px 15px',
                  overflow: 'visible',
                  textOverflow: 'clip',
                  wordWrap: 'break-word'
                }}
                onClick={() => onRoleSelect(role.key)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = `0 12px 32px ${role.color}40`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  width: '100%',
                  padding: '0 10px',
                  overflow: 'visible',
                  minWidth: 0
                }}>
                  <Avatar size={64} style={{ backgroundColor: role.color, marginBottom: 16 }}>
                    {role.icon}
                  </Avatar>
                  <div 
                    style={{ 
                      marginBottom: 12, 
                      fontSize: '20px', 
                      fontWeight: 'bold',
                      color: '#1E50B3',
                      width: '100%',
                      textAlign: 'center',
                      lineHeight: '1.6',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      whiteSpace: 'normal',
                      overflow: 'visible',
                      textOverflow: 'clip',
                      padding: '0 10px',
                      minHeight: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span style={{ display: 'inline-block', width: '100%' }}>{role.name}</span>
                  </div>
                  <div 
                    style={{ 
                      color: '#666', 
                      fontSize: '13px', 
                      marginBottom: 0, 
                      lineHeight: '1.6',
                      minHeight: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      width: '100%',
                      padding: '0 5px',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word'
                    }}
                  >
                    {role.description}
                  </div>
                </div>
                <Button 
                  type="primary" 
                  style={{ 
                    backgroundColor: role.color, 
                    borderColor: role.color,
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginTop: 16,
                    width: '100%',
                    height: '40px'
                  }}
                >
                  进入系统
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  )
}

// 患者界面
function PatientInterface() {
  const [activeTab, setActiveTab] = useState('profile')
  const [orderModalVisible, setOrderModalVisible] = useState(false)

  const menuItems = [
    { key: 'profile', icon: <UserOutlined />, label: '个人档案' },
    { key: 'nutrition', icon: <HeartOutlined />, label: '营养方案' },
    { key: 'orders', icon: <ShoppingCartOutlined />, label: '我的订单' },
    { key: 'recommendations', icon: <RobotOutlined />, label: 'AI推荐' },
    { key: 'support', icon: <MessageOutlined />, label: '客服支持' }
  ]

  const tabItems = [
    {
      key: 'profile',
      label: '个人档案',
      children: (
        <Card title="个人信息" style={{ background: 'linear-gradient(135deg, #E6F7F7 0%, #f0f9ff 100%)' }}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card 
                size="small" 
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  color: '#fff'
                }}
              >
                <Title level={4} style={{ color: '#fff', marginBottom: 16 }}>
                  <UserOutlined style={{ marginRight: 8 }} />基本信息
                </Title>
                <List
                  dataSource={[
                    { label: '姓名', value: patientData.profile.name, icon: <UserOutlined /> },
                    { label: '年龄', value: patientData.profile.age, icon: <CalendarOutlined /> },
                    { label: '病房', value: patientData.profile.room, icon: <MedicineBoxOutlined /> },
                    { label: '主治医生', value: patientData.profile.doctor, icon: <TeamOutlined /> },
                  ]}
                  renderItem={item => (
                    <List.Item style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                      <Space>
                        <span style={{ color: '#fff' }}>{item.icon}</span>
                        <Text strong style={{ color: '#fff' }}>{item.label}:</Text> 
                        <Text style={{ color: '#fff' }}>{item.value}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card 
                size="small" 
                style={{ 
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  border: 'none',
                  color: '#fff'
                }}
              >
                <Title level={4} style={{ color: '#fff', marginBottom: 16 }}>
                  <HeartOutlined style={{ marginRight: 8 }} />医疗信息
                </Title>
                <List
                  dataSource={[
                    { label: '诊断', value: patientData.profile.diagnosis, color: 'cyan' },
                    { label: '过敏史', value: patientData.profile.allergies, color: 'red' },
                    { label: '膳食方案', value: patientData.profile.dietPlan, color: 'green' },
                  ]}
                  renderItem={item => (
                    <List.Item style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                      <Text strong style={{ color: '#fff' }}>{item.label}:</Text> 
                      <Tag color={item.color} style={{ marginLeft: 8, fontSize: '12px' }}>{item.value}</Tag>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Card>
      )
    },
    {
      key: 'nutrition',
      label: '营养方案',
      children: (
        <Card title="今日营养目标" style={{ background: 'linear-gradient(135deg, #E6F7F7 0%, #f0f9ff 100%)' }}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card 
                size="small" 
                style={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(255,154,158,0.3)'
                }}
              >
                <Statistic 
                  title={<span style={{ color: '#fff', fontWeight: 'bold' }}>热量</span>} 
                  value={patientData.nutrition.dailyCalories} 
                  suffix="kcal"
                  valueStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Progress percent={75} size="small" strokeColor="#fff" />
              </Card>
            </Col>
            <Col span={6}>
              <Card 
                size="small" 
                style={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(79,172,254,0.3)'
                }}
              >
                <Statistic 
                  title={<span style={{ color: '#fff', fontWeight: 'bold' }}>蛋白质</span>} 
                  value={patientData.nutrition.protein} 
                  suffix="g"
                  valueStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Progress percent={80} size="small" strokeColor="#fff" />
              </Card>
            </Col>
            <Col span={6}>
              <Card 
                size="small" 
                style={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(67,233,123,0.3)'
                }}
              >
                <Statistic 
                  title={<span style={{ color: '#fff', fontWeight: 'bold' }}>碳水化合物</span>} 
                  value={patientData.nutrition.carbs} 
                  suffix="g"
                  valueStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Progress percent={70} size="small" strokeColor="#fff" />
              </Card>
            </Col>
            <Col span={6}>
              <Card 
                size="small" 
                style={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(250,112,154,0.3)'
                }}
              >
                <Statistic 
                  title={<span style={{ color: '#fff', fontWeight: 'bold' }}>脂肪</span>} 
                  value={patientData.nutrition.fat} 
                  suffix="g"
                  valueStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Progress percent={65} size="small" strokeColor="#fff" />
              </Card>
            </Col>
          </Row>
          
          <Card 
            title="营养师建议" 
            style={{ 
              marginTop: 16,
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
              border: 'none',
              borderRadius: '12px'
            }}
          >
            <List
              dataSource={patientData.recommendations}
              renderItem={(item, index) => {
                const colors = ['#52c41a', '#1890ff', '#faad14']
                return (
                  <List.Item style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                    <CheckIcon style={{ color: colors[index % colors.length], marginRight: 8, fontSize: '18px' }} />
                    <Text strong style={{ fontSize: '15px' }}>{item}</Text>
                  </List.Item>
                )
              }}
            />
          </Card>
        </Card>
      )
    },
    {
      key: 'orders',
      label: '我的订单',
      children: (
        <Card 
          title="我的订单" 
          style={{ background: 'linear-gradient(135deg, #E6F7F7 0%, #f0f9ff 100%)' }}
          extra={
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => setOrderModalVisible(true)}
              style={{
                background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold'
              }}
            >
              新订单
            </Button>
          }
        >
          <Table
            dataSource={patientData.orders}
            columns={[
              { title: '订单号', dataIndex: 'id', key: 'id' },
              { title: '日期', dataIndex: 'date', key: 'date' },
              { title: '餐品', dataIndex: 'meal', key: 'meal' },
              { 
                title: '状态', 
                dataIndex: 'status', 
                key: 'status',
                render: (status: string) => {
                  const statusConfig: Record<string, { color: string, bg: string }> = { 
                    '已完成': { color: '#52c41a', bg: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' }, 
                    '配送中': { color: '#1890ff', bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }, 
                    '准备中': { color: '#faad14', bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }
                  }
                  const config = statusConfig[status] || { color: 'default', bg: '#f5f5f5' }
                  return (
                    <Tag 
                      color={config.color}
                      style={{ 
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        background: config.bg,
                        border: 'none'
                      }}
                    >
                      {status}
                    </Tag>
                  )
                }
              },
              { 
                title: '评分', 
                dataIndex: 'rating', 
                key: 'rating',
                render: (rating: number | null) => rating ? <Rate disabled value={rating} /> : <Button size="small">评价</Button>
              }
            ]}
          />
        </Card>
      )
    },
    {
      key: 'recommendations',
      label: 'AI推荐',
      children: (
        <Card 
          title={
            <span>
              <RobotOutlined style={{ color: '#1890ff', marginRight: 8 }} />
              AI智能推荐
            </span>
          }
          style={{ background: 'linear-gradient(135deg, #E6F7F7 0%, #f0f9ff 100%)' }}
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card 
                hoverable 
                style={{ 
                  textAlign: 'center',
                  border: '3px solid #52c41a',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(82,196,26,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(82,196,26,0.2)'
                }}
              >
                <Image src="/imgs/1.png" style={{ borderRadius: 8, marginBottom: 12 }} />
                <Title level={4} style={{ color: '#1E50B3' }}>糖尿病早餐</Title>
                <Text style={{ color: '#666', display: 'block', marginBottom: 12 }}>低糖燕麦粥 + 水煮蛋</Text>
                <div style={{ marginTop: 8, marginBottom: 12 }}>
                  <Tag color="success" style={{ fontSize: '14px', padding: '4px 12px' }}>
                    <StarOutlined /> 推荐指数: 95%
                  </Tag>
                </div>
                <Button 
                  type="primary" 
                  style={{ 
                    marginTop: 8,
                    background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold'
                  }}
                >
                  选择此餐
                </Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card 
                hoverable 
                style={{ 
                  textAlign: 'center',
                  border: '3px solid #1890ff',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(24,144,255,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(24,144,255,0.2)'
                }}
              >
                <Image src="/imgs/2.png" style={{ borderRadius: 8, marginBottom: 12 }} />
                <Title level={4} style={{ color: '#1E50B3' }}>糖尿病午餐</Title>
                <Text style={{ color: '#666', display: 'block', marginBottom: 12 }}>清蒸鱼 + 蔬菜沙拉</Text>
                <div style={{ marginTop: 8, marginBottom: 12 }}>
                  <Tag color="processing" style={{ fontSize: '14px', padding: '4px 12px' }}>
                    <StarOutlined /> 推荐指数: 92%
                  </Tag>
                </div>
                <Button 
                  type="primary" 
                  style={{ 
                    marginTop: 8,
                    background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold'
                  }}
                >
                  选择此餐
                </Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card 
                hoverable 
                style={{ 
                  textAlign: 'center',
                  border: '3px solid #faad14',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(250,173,20,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(250,173,20,0.2)'
                }}
              >
                <Image src="/imgs/3.png" style={{ borderRadius: 8, marginBottom: 12 }} />
                <Title level={4} style={{ color: '#1E50B3' }}>糖尿病晚餐</Title>
                <Text style={{ color: '#666', display: 'block', marginBottom: 12 }}>蒸蛋羹 + 青菜汤</Text>
                <div style={{ marginTop: 8, marginBottom: 12 }}>
                  <Tag color="warning" style={{ fontSize: '14px', padding: '4px 12px' }}>
                    <StarOutlined /> 推荐指数: 88%
                  </Tag>
                </div>
                <Button 
                  type="primary" 
                  style={{ 
                    marginTop: 8,
                    background: 'linear-gradient(135deg, #faad14 0%, #ffc53d 100%)',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold'
                  }}
                >
                  选择此餐
                </Button>
              </Card>
            </Col>
          </Row>
        </Card>
      )
    },
    {
      key: 'support',
      label: '客服支持',
      children: (
        <Card title="客服支持">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="常见问题">
                <Collapse>
                  <Panel header="如何修改订单？" key="1">
                    <Text>订单在配送前2小时可以修改，超过时间请联系客服。</Text>
                  </Panel>
                  <Panel header="如何评价餐品？" key="2">
                    <Text>订单完成后，在"我的订单"页面点击"评价"按钮即可。</Text>
                  </Panel>
                  <Panel header="营养方案如何调整？" key="3">
                    <Text>请联系您的营养师或主治医生进行调整。</Text>
                  </Panel>
                </Collapse>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="联系客服">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button icon={<PhoneOutlined />} block>电话客服: 400-123-4567</Button>
                  <Button icon={<MessageOutlined />} block>在线客服</Button>
                  <Button icon={<BellOutlined />} block>意见反馈</Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </Card>
      )
    }
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <div style={{ padding: 16, textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <Avatar size={48} style={{ backgroundColor: '#52c41a', marginBottom: 8 }}>
            <UserOutlined />
          </Avatar>
          <div style={{ fontWeight: 'bold' }}>患者端</div>
          <div style={{ fontSize: 12, color: '#666' }}>{patientData.profile.name}</div>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[activeTab]}
          items={menuItems}
          onClick={({ key }) => setActiveTab(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#52c41a', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Title level={3} style={{ color: '#fff', margin: 0 }}>患者订餐系统</Title>
            <Button type="primary" danger icon={<LogoutOutlined />}>退出</Button>
          </div>
        </Header>
        <Content style={{ 
          padding: 24, 
          background: 'linear-gradient(135deg, #E6F7F7 0%, #f0f9ff 50%, #fff5f5 100%)',
          minHeight: 'calc(100vh - 64px)'
        }}>
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
        </Content>
      </Layout>
      
      <Modal
        title="新订单"
        open={orderModalVisible}
        onOk={() => setOrderModalVisible(false)}
        onCancel={() => setOrderModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="选择餐品">
            <Select placeholder="请选择餐品">
              <Select.Option value="breakfast">糖尿病早餐</Select.Option>
              <Select.Option value="lunch">糖尿病午餐</Select.Option>
              <Select.Option value="dinner">糖尿病晚餐</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="配送时间">
            <Select placeholder="请选择配送时间">
              <Select.Option value="morning">早餐 7:00-8:00</Select.Option>
              <Select.Option value="noon">午餐 11:30-12:30</Select.Option>
              <Select.Option value="evening">晚餐 17:30-18:30</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="特殊要求">
            <Input.TextArea placeholder="如：少盐、切碎等" rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}

// 营养师界面
function DietitianInterface() {
  const [activeTab, setActiveTab] = useState('patients')
  const [reviewModalVisible, setReviewModalVisible] = useState(false)

  const menuItems = [
    { key: 'patients', icon: <UserOutlined />, label: '患者管理' },
    { key: 'plans', icon: <FileTextOutlined />, label: '营养方案' },
    { key: 'reviews', icon: <CheckCircleOutlined />, label: '审核中心' },
    { key: 'analytics', icon: <BarChartOutlined />, label: '数据分析' }
  ]

  const tabItems = [
    {
      key: 'patients',
      label: '患者管理',
      children: (
        <Card 
          title="患者列表" 
          style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)' }}
          extra={
            <Button 
              icon={<SearchOutlined />}
              style={{
                background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
                border: 'none',
                color: '#fff',
                borderRadius: '6px',
                fontWeight: 'bold'
              }}
            >
              搜索
            </Button>
          }
        >
          <Table
            dataSource={dietitianData.patients}
            columns={[
              { title: '患者ID', dataIndex: 'id', key: 'id' },
              { title: '姓名', dataIndex: 'name', key: 'name' },
              { title: '病房', dataIndex: 'room', key: 'room' },
              { title: '诊断', dataIndex: 'diagnosis', key: 'diagnosis' },
              { title: '膳食方案', dataIndex: 'plan', key: 'plan' },
              { 
                title: '状态', 
                dataIndex: 'status', 
                key: 'status',
                render: (status: string) => {
                  const statusConfig: Record<string, { color: string, bg: string }> = { 
                    '待审核': { color: '#faad14', bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }, 
                    '已通过': { color: '#52c41a', bg: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' }, 
                    '已拒绝': { color: '#ff4d4f', bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' }
                  }
                  const config = statusConfig[status] || { color: 'default', bg: '#f5f5f5' }
                  return (
                    <Tag 
                      color={config.color}
                      style={{ 
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        background: config.bg,
                        border: 'none'
                      }}
                    >
                      {status}
                    </Tag>
                  )
                }
              },
              {
                title: '操作',
                key: 'action',
                render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<EditIcon />}>编辑</Button>
                  </Space>
                )
              }
            ]}
          />
        </Card>
      )
    },
    {
      key: 'plans',
      label: '营养方案',
      children: (
        <Card 
          title="营养方案库" 
          style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)' }}
          extra={
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              style={{
                background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold'
              }}
            >
              新增方案
            </Button>
          }
        >
          <Row gutter={[16, 16]}>
            {dietitianData.nutritionPlans.map((plan, index) => {
              const gradients = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
              ]
              return (
                <Col span={8} key={plan.id}>
                  <Card 
                    hoverable
                    style={{
                      background: gradients[index % gradients.length],
                      border: 'none',
                      borderRadius: '12px',
                      color: '#fff',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)'
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.25)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                  >
                    <Title level={4} style={{ color: '#fff', marginBottom: 16 }}>{plan.name}</Title>
                    <List 
                      size="small"
                      dataSource={[
                        { label: '热量', value: `${plan.calories} kcal` },
                        { label: '蛋白质', value: `${plan.protein} g` },
                        { label: '碳水', value: `${plan.carbs} g` },
                        { label: '脂肪', value: `${plan.fat} g` }
                      ]}
                      renderItem={item => (
                        <List.Item style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                          <Text style={{ color: '#fff' }}>{item.label}: <strong>{item.value}</strong></Text>
                        </List.Item>
                      )}
                    />
                    <Space style={{ marginTop: 16 }}>
                      <Button size="small" icon={<EditIcon />} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}>编辑</Button>
                      <Button size="small" icon={<DeleteIcon />} danger style={{ borderColor: 'rgba(255,255,255,0.5)' }}>删除</Button>
                    </Space>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Card>
      )
    },
    {
      key: 'reviews',
      label: '审核中心',
      children: (
        <Card 
          title="待审核方案" 
          style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)' }}
        >
          <Alert
            message={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>您有 {dietitianData.pendingReviews} 个营养方案待审核</span>}
            type="warning"
            showIcon
            style={{ 
              marginBottom: 16,
              background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
              border: '2px solid #faad14',
              borderRadius: '8px'
            }}
          />
          <Table
            dataSource={[
              { id: 'R001', patient: '张三', plan: '糖尿病标准餐', submitTime: '2024-01-15 10:30', status: '待审核' },
              { id: 'R002', patient: '李四', plan: '高血压低盐餐', submitTime: '2024-01-15 09:15', status: '待审核' },
            ]}
            columns={[
              { title: '审核ID', dataIndex: 'id', key: 'id' },
              { title: '患者', dataIndex: 'patient', key: 'patient' },
              { title: '方案名称', dataIndex: 'plan', key: 'plan' },
              { title: '提交时间', dataIndex: 'submitTime', key: 'submitTime' },
              { 
                title: '状态', 
                dataIndex: 'status', 
                key: 'status',
                render: (status: string) => <Tag color="warning">{status}</Tag>
              },
              {
                title: '操作',
                key: 'action',
                render: () => (
                  <Space>
                    <Button type="primary" size="small" onClick={() => setReviewModalVisible(true)}>审核</Button>
                    <Button size="small">查看详情</Button>
                  </Space>
                )
              }
            ]}
          />
        </Card>
      )
    },
    {
      key: 'analytics',
      label: '数据分析',
      children: (
        <Card title="营养师工作统计">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card size="small" style={{ textAlign: 'center' }}>
                <Statistic title="待审核" value={dietitianData.pendingReviews} />
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small" style={{ textAlign: 'center' }}>
                <Statistic title="今日通过" value={dietitianData.approvedToday} />
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small" style={{ textAlign: 'center' }}>
                <Statistic title="管理患者" value={dietitianData.patients.length} />
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small" style={{ textAlign: 'center' }}>
                <Statistic title="方案库" value={dietitianData.nutritionPlans.length} />
              </Card>
            </Col>
          </Row>
        </Card>
      )
    }
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <div style={{ padding: 16, textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <Avatar size={48} style={{ backgroundColor: '#1890ff', marginBottom: 8 }}>
            <TeamOutlined />
          </Avatar>
          <div style={{ fontWeight: 'bold' }}>营养师端</div>
          <div style={{ fontSize: 12, color: '#666' }}>李营养师</div>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[activeTab]}
          items={menuItems}
          onClick={({ key }) => setActiveTab(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#1890ff', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Title level={3} style={{ color: '#fff', margin: 0 }}>营养师管理系统</Title>
            <Button type="primary" danger icon={<LogoutOutlined />}>退出</Button>
          </div>
        </Header>
        <Content style={{ 
          padding: 24, 
          background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #fef3c7 100%)',
          minHeight: 'calc(100vh - 64px)'
        }}>
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
        </Content>
      </Layout>
      
      <Modal
        title="营养方案审核"
        open={reviewModalVisible}
        onOk={() => setReviewModalVisible(false)}
        onCancel={() => setReviewModalVisible(false)}
        width={800}
      >
        <Form layout="vertical">
          <Form.Item label="患者信息">
            <Input value="张三 (301A) - 2型糖尿病" disabled />
          </Form.Item>
          <Form.Item label="营养方案">
            <Card size="small">
              <List size="small">
                <List.Item>热量: 1800 kcal</List.Item>
                <List.Item>蛋白质: 90 g</List.Item>
                <List.Item>碳水化合物: 180 g</List.Item>
                <List.Item>脂肪: 60 g</List.Item>
              </List>
            </Card>
          </Form.Item>
          <Form.Item label="审核意见">
            <Input.TextArea placeholder="请输入审核意见" rows={4} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<CheckIcon />}>通过</Button>
              <Button danger icon={<CloseCircleOutlined />}>拒绝</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}

// 管理员界面
function AdminInterface() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: '数据看板' },
    { key: 'orders', icon: <ShoppingCartOutlined />, label: '订单管理' },
    { key: 'users', icon: <UserOutlined />, label: '用户管理' },
    { key: 'system', icon: <SettingOutlined />, label: '系统设置' },
    { key: 'reports', icon: <BarChartOutlined />, label: '报表分析' }
  ]

  const tabItems = [
    {
      key: 'dashboard',
      label: '数据看板',
      children: (
      <div>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col span={4}>
              <Card 
                size="small" 
                style={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              >
                <Statistic 
                  title={<span style={{ color: '#fff' }}>总订单数</span>} 
                  value={adminData.stats.totalOrders} 
                  prefix={<ShoppingCartOutlined style={{ color: '#fff' }} />}
                  valueStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card 
                size="small" 
                style={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              >
                <Statistic 
                  title={<span style={{ color: '#fff' }}>总收入</span>} 
                  value={adminData.stats.totalRevenue} 
                  prefix={<span style={{ color: '#fff' }}>¥</span>}
                  valueStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card 
                size="small" 
                style={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              >
                <Statistic 
                  title={<span style={{ color: '#fff' }}>活跃患者</span>} 
                  value={adminData.stats.activePatients} 
                  prefix={<UserOutlined style={{ color: '#fff' }} />}
                  valueStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card 
                size="small" 
                style={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              >
                <Statistic 
                  title={<span style={{ color: '#fff' }}>满意度</span>} 
                  value={adminData.stats.satisfaction} 
                  suffix={<span style={{ color: '#fff' }}>/5</span>} 
                  prefix={<StarOutlined style={{ color: '#fff' }} />}
                  valueStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card 
                size="small" 
                style={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              >
                <Statistic 
                  title={<span style={{ color: '#fff' }}>安全评分</span>} 
                  value={adminData.stats.safetyScore} 
                  suffix={<span style={{ color: '#fff' }}>%</span>} 
                  prefix={<SafetyCertificateOutlined style={{ color: '#fff' }} />}
                  valueStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card 
                size="small" 
                style={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              >
                <Statistic 
                  title={<span style={{ color: '#fff' }}>系统可用性</span>} 
                  value={adminData.stats.systemUptime} 
                  suffix={<span style={{ color: '#fff' }}>%</span>} 
                  prefix={<ThunderboltOutlined style={{ color: '#fff' }} />}
                  valueStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>
          
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card 
                title="系统告警" 
                style={{ 
                  background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
                  borderRadius: '12px'
                }}
              >
                <List
                  dataSource={adminData.alerts}
                  renderItem={item => {
                    const alertConfig: Record<string, { bg: string, border: string }> = {
                      'warning': { bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', border: '#faad14' },
                      'info': { bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', border: '#1890ff' },
                      'success': { bg: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)', border: '#52c41a' }
                    }
                    const config = alertConfig[item.type] || { bg: '#f5f5f5', border: '#d9d9d9' }
                    return (
                      <List.Item>
                        <Alert
                          message={<Text strong style={{ fontSize: '15px' }}>{item.message}</Text>}
                          type={item.type as any}
                          showIcon
                          style={{ 
                            width: '100%',
                            background: config.bg,
                            border: `2px solid ${config.border}`,
                            borderRadius: '8px'
                          }}
                          action={<Text strong style={{ color: '#666' }}>{item.time}</Text>}
                        />
                      </List.Item>
                    )
                  }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card 
                title="快速操作" 
                style={{ 
                  background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
                  borderRadius: '12px'
                }}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button 
                    icon={<DownloadOutlined />} 
                    block
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      color: '#fff',
                      fontWeight: 'bold',
                      borderRadius: '6px'
                    }}
                  >
                    导出数据
                  </Button>
                  <Button 
                    icon={<UploadOutlined />} 
                    block
                    style={{
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      border: 'none',
                      color: '#fff',
                      fontWeight: 'bold',
                      borderRadius: '6px'
                    }}
                  >
                    导入配置
                  </Button>
                  <Button 
                    icon={<SyncOutlined />} 
                    block
                    style={{
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      border: 'none',
                      color: '#fff',
                      fontWeight: 'bold',
                      borderRadius: '6px'
                    }}
                  >
                    同步数据
                  </Button>
                  <Button 
                    icon={<SettingOutlined />} 
                    block
                    style={{
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                      border: 'none',
                      color: '#fff',
                      fontWeight: 'bold',
                      borderRadius: '6px'
                    }}
                  >
                    系统维护
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      )
    },
    {
      key: 'orders',
      label: '订单管理',
      children: (
        <Card 
          title="订单管理" 
          style={{ background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' }}
          extra={
            <Button 
              icon={<FilterOutlined />}
              style={{
                background: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
                border: 'none',
                color: '#fff',
                borderRadius: '6px',
                fontWeight: 'bold'
              }}
            >
              筛选
            </Button>
          }
        >
          <Table
            dataSource={adminData.orders}
            columns={[
              { title: '订单号', dataIndex: 'id', key: 'id' },
              { title: '患者', dataIndex: 'patient', key: 'patient' },
              { title: '病房', dataIndex: 'room', key: 'room' },
              { title: '餐品', dataIndex: 'meal', key: 'meal' },
              { title: '金额', dataIndex: 'amount', key: 'amount', render: (amount) => <Text strong style={{ color: '#f5576c' }}>¥{amount}</Text> },
              { 
                title: '状态', 
                dataIndex: 'status', 
                key: 'status',
                render: (status: string) => {
                  const statusConfig: Record<string, { color: string, bg: string }> = { 
                    '已完成': { color: '#52c41a', bg: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' }, 
                    '配送中': { color: '#1890ff', bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }, 
                    '准备中': { color: '#faad14', bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }
                  }
                  const config = statusConfig[status] || { color: 'default', bg: '#f5f5f5' }
                  return (
                    <Tag 
                      color={config.color}
                      style={{ 
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        background: config.bg,
                        border: 'none'
                      }}
                    >
                      {status}
                    </Tag>
                  )
                }
              },
              { title: '时间', dataIndex: 'time', key: 'time' },
              {
                title: '操作',
                key: 'action',
                render: () => (
                  <Space>
                    <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
                    <Button type="link" size="small" icon={<EditIcon />}>编辑</Button>
                    <Button type="link" size="small" icon={<DeleteIcon />} danger>删除</Button>
                  </Space>
                )
              }
            ]}
          />
        </Card>
      )
    },
    {
      key: 'users',
      label: '用户管理',
      children: (
        <Card title="用户管理">
          <Tabs>
            <TabPane tab="患者管理" key="patients">
              <Table
                dataSource={[
                  { id: 'P001', name: '张三', room: '301A', status: '活跃', lastLogin: '2024-01-15' },
                  { id: 'P002', name: '李四', room: '205B', status: '活跃', lastLogin: '2024-01-15' },
                ]}
                columns={[
                  { title: '患者ID', dataIndex: 'id', key: 'id' },
                  { title: '姓名', dataIndex: 'name', key: 'name' },
                  { title: '病房', dataIndex: 'room', key: 'room' },
                  { title: '状态', dataIndex: 'status', key: 'status', render: (status) => <Tag color="green">{status}</Tag> },
                  { title: '最后登录', dataIndex: 'lastLogin', key: 'lastLogin' },
                  { title: '操作', key: 'action', render: () => <Button size="small">管理</Button> }
                ]}
              />
            </TabPane>
            <TabPane tab="营养师管理" key="dietitians">
              <Table
                dataSource={[
                  { id: 'D001', name: '李营养师', department: '营养科', status: '在线', patients: 15 },
                  { id: 'D002', name: '王营养师', department: '营养科', status: '离线', patients: 12 },
                ]}
                columns={[
                  { title: '营养师ID', dataIndex: 'id', key: 'id' },
                  { title: '姓名', dataIndex: 'name', key: 'name' },
                  { title: '科室', dataIndex: 'department', key: 'department' },
                  { title: '状态', dataIndex: 'status', key: 'status', render: (status) => <Tag color={status === '在线' ? 'green' : 'red'}>{status}</Tag> },
                  { title: '管理患者', dataIndex: 'patients', key: 'patients' },
                  { title: '操作', key: 'action', render: () => <Button size="small">管理</Button> }
                ]}
              />
            </TabPane>
          </Tabs>
        </Card>
      )
    },
    {
      key: 'system',
      label: '系统设置',
      children: (
        <Card title="系统设置">
          <Tabs>
            <TabPane tab="基础设置" key="basic">
              <Form layout="vertical">
                <Form.Item label="系统名称">
                  <Input defaultValue="医院订餐SaaS系统" />
                </Form.Item>
                <Form.Item label="系统版本">
                  <Input defaultValue="v2.1.0" disabled />
                </Form.Item>
                <Form.Item label="维护模式">
                  <Select defaultValue="off">
                    <Select.Option value="off">关闭</Select.Option>
                    <Select.Option value="on">开启</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" icon={<SaveOutlined />}>保存设置</Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="数据备份" key="backup">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button icon={<DownloadOutlined />} block>立即备份</Button>
                <Button icon={<UploadOutlined />} block>恢复数据</Button>
                <Button icon={<CalendarOutlined />} block>定时备份设置</Button>
              </Space>
            </TabPane>
          </Tabs>
        </Card>
      )
    },
    {
      key: 'reports',
      label: '报表分析',
      children: (
        <Card title="报表分析">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card title="订单趋势" hoverable>
                <div style={{ height: 200, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                  <Text style={{ color: 'white', fontSize: 16 }}>📈 订单趋势图</Text>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="收入分析" hoverable>
                <div style={{ height: 200, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                  <Text style={{ color: 'white', fontSize: 16 }}>💰 收入分析图</Text>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="用户活跃度" hoverable>
                <div style={{ height: 200, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                  <Text style={{ color: 'white', fontSize: 16 }}>👥 用户活跃度图</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>
      )
    }
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <div style={{ padding: 16, textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <Avatar size={48} style={{ backgroundColor: '#722ed1', marginBottom: 8 }}>
            <CrownOutlined />
          </Avatar>
          <div style={{ fontWeight: 'bold' }}>管理员端</div>
          <div style={{ fontSize: 12, color: '#666' }}>系统管理员</div>
      </div>
        <Menu
          mode="inline"
          selectedKeys={[activeTab]}
          items={menuItems}
          onClick={({ key }) => setActiveTab(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#722ed1', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Title level={3} style={{ color: '#fff', margin: 0 }}>管理员控制台</Title>
            <Button type="primary" danger icon={<LogoutOutlined />}>退出</Button>
      </div>
        </Header>
        <Content style={{ 
          padding: 24, 
          background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 50%, #fff9c4 100%)',
          minHeight: 'calc(100vh - 64px)'
        }}>
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
        </Content>
      </Layout>
    </Layout>
  )
}

function App() {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null)

  if (!currentRole) {
    return <RoleSelection onRoleSelect={setCurrentRole} />
  }

  switch (currentRole) {
    case 'patient':
      return <PatientInterface />
    case 'dietitian':
      return <DietitianInterface />
    case 'admin':
      return <AdminInterface />
    default:
      return <RoleSelection onRoleSelect={setCurrentRole} />
  }
}

export default App