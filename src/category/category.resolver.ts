import { Query, Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from 'src/graphql';
import { UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/jwt.guard';

@Resolver('Category')
@UseGuards(JWTAuthGuard)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query('getCategory')
  getCategory(@Args('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @Query('getCategories')
  getCategories() {
    return this.categoryService.getAllCategories();
  }

  @Mutation('createCategory')
  async createCategory(
    @Args('data') data: CreateCategoryInput,
    @Context() context,
  ) {
    return this.categoryService.createCategory({
      ...data,
      createdById: context.req.user.id,
    });
  }
}
