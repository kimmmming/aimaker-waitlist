# PostgreSQL 数据库设置指南

## 1. 安装 PostgreSQL

### Windows
- 下载并安装 [PostgreSQL](https://www.postgresql.org/download/windows/)
- 或使用 Docker: `docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:15`

### macOS
```bash
brew install postgresql
brew services start postgresql
```

### Linux
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## 2. 创建数据库

```sql
-- 连接到 PostgreSQL
psql -U postgres

-- 创建数据库
CREATE DATABASE aimaker_waitlist;

-- 创建用户（可选）
CREATE USER aimaker_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE aimaker_waitlist TO aimaker_user;
```

## 3. 配置环境变量

在项目根目录创建 `.env` 文件：

```env
# PostgreSQL 数据库连接
DATABASE_URL="postgresql://postgres:password@localhost:5432/aimaker_waitlist?schema=public"

# 或使用自定义用户
# DATABASE_URL="postgresql://aimaker_user:your_password@localhost:5432/aimaker_waitlist?schema=public"
```

## 4. 运行数据库迁移

```bash
# 生成并应用数据库迁移
npx prisma migrate dev --name init

# 如果只是重新生成客户端
npx prisma generate
```

## 5. 查看数据库

```bash
# 打开 Prisma Studio 查看数据
npx prisma studio
```

## 数据库结构

### waitlist_users 表
- `id`: 主键 (cuid)
- `email`: 用户邮箱 (唯一)
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

## 故障排除

1. **连接失败**: 检查 PostgreSQL 是否运行，端口是否正确
2. **权限错误**: 确保用户有数据库访问权限
3. **迁移失败**: 删除 `prisma/migrations` 文件夹重新迁移 