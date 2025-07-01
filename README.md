# AImaker Waitlist

一个使用 Next.js 14 + TypeScript + Tailwind CSS + PostgreSQL 构建的候补名单网站。

## 功能特点

- ✨ 现代化 UI 设计
- 📧 邮箱收集和验证
- 🗄️ PostgreSQL 数据存储
- 🛡️ 重复邮箱检测
- 📊 管理后台
- 🎨 响应式设计

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: PostgreSQL
- **ORM**: Prisma
- **部署**: Vercel 推荐

## 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd aimaker-waitlist
```

### 2. 安装依赖

```bash
npm install
```

### 3. 设置数据库

请参考 `DATABASE_SETUP.md` 文件配置 PostgreSQL 数据库。

创建 `.env` 文件：

```env
DATABASE_URL="postgresql://username:password@localhost:5432/aimaker_waitlist?schema=public"
```

### 4. 数据库迁移

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站。

## 页面路由

- `/` - 主页面（用户注册）
- `/admin` - 管理后台（查看注册用户）

## API 接口

### POST /api/waitlist

提交邮箱到候补名单

**请求体**:
```json
{
  "email": "user@example.com"
}
```

**响应**:
```json
{
  "message": "成功加入候补名单！",
  "user": {
    "id": "clxxxxxx",
    "email": "user@example.com"
  }
}
```

## 部署

### Vercel 部署

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量 `DATABASE_URL`
4. 运行 `npx prisma migrate deploy` 部署数据库

### 环境变量

```env
DATABASE_URL="your-postgresql-connection-string"
```

## 开发

### 数据库操作

```bash
# 查看数据库
npx prisma studio

# 重置数据库
npx prisma migrate reset

# 生成客户端
npx prisma generate
```

### 代码结构

```
src/
├── app/
│   ├── page.tsx          # 主页面
│   ├── admin/page.tsx    # 管理页面
│   ├── api/waitlist/     # API 路由
│   └── layout.tsx        # 布局
├── lib/
│   └── db.ts            # 数据库配置
└── ...
```

## License

MIT
