import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const permissions: Prisma.PermissionCreateManyInput[] = [
  {
    name: 'User Management',
    access: 'user-management',
  },
  {
    name: 'Order Management',
    access: 'order-management',
  },
  {
    name: 'Inventory Management',
    access: 'inventory-management',
  },
];

interface IMemberRolePayLoad {
  name: string;
  permission: {
    name: string;
    path: string;
  };
}

const RoleCreate = async (data: IMemberRolePayLoad[]) => {
  return data.map(async (role) => {
    const createdPermission = await prisma.permission.create({
      data: {
        name: role.permission.name,
        access: role.permission.path,
      },
    });

    const createdMemberRole = await prisma.role.create({
      data: {
        name: role.name,
        RoleOnPermissions: {
          createMany: {
            data: [
              {
                permissionId: createdPermission.id,
              },
            ],
          },
        },
      },
    });

    return createdMemberRole;
  });
};

async function main() {
  console.log(`Start seeding ...`);

  for (const permission of permissions) {
    const permissionSeededData = await prisma.permission.create({
      data: permission,
    });
    console.log(
      `Created permission with id: ${permissionSeededData.id} permission: ${permissionSeededData.name}`,
    );
  }

  const role = await RoleCreate([
    {
      name: 'member',
      permission: {
        name: 'Member',
        path: '*',
      },
    },
    {
      name: 'super admin',
      permission: {
        name: 'Master',
        path: '*',
      },
    },
  ]);

  console.log(
    `Created role with name: ${(await role[0]).name} and ${
      (await role[1]).name
    }`,
  );

  console.log(`Seeding finished ... `);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
