import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FormData } from '../HandpickForm';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, Package, Tag } from 'lucide-react';

const brands = [
  'Carhartt', 'Ralph Lauren', 'Stone Island', 'Stussy', 'Nike', 'Burberry', 'Arc Teryx', 'Patagonia',
];

const categoryOptions = [
  'Carhartt', 'Ralph Lauren', 'Stone Island', 'Stussy', 'Nike', 'Burberry', 'Patagonia', 'Other'
];


const gradeOptions = ['A Grade', 'B Grade', 'C Grade', 'Mix Grade'];
const sizeOptions = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'XS–S',
  'S–M',
  'M–L',
  'L–XL',
  'XL–XXL',
  'Custom'
];
const colorOptions = [
  'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Orange',
  'Purple', 'Pink', 'Gray', 'Brown', 'Multi-color', 'Custom'
];

const ProductStep: React.FC = () => {
  const { control, watch, setValue, getValues } = useFormContext<FormData>();
  const [showCustomBrand, setShowCustomBrand] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categories',
  });

  const selectedBrands = watch('brands') || [];

  const handleBrandChange = (brand: string, checked: boolean) => {
    const currentBrands = getValues('brands') || [];

    if (brand === 'Other (Custom)') {
      setShowCustomBrand(checked);
    }

    if (checked) {
      setValue('brands', [...currentBrands, brand]);
    } else {
      setValue('brands', currentBrands.filter(b => b !== brand));
      if (brand === 'Other (Custom)') {
        setValue('customBrand', '');
      }
    }
  };

  const addCategory = () => {
    append({
      name: '',
      grade: '',
      size: '',
      color: '',
      quantity: 1,
      description: ''
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Product Selection</h2>
        <p className="text-muted-foreground">
          Tell us about your preferred brands and product specifications
        </p>
      </div>



      {/* Categories */}
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Product Categories
          </CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addCategory}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {fields.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No categories added yet. Click "Add Category" to get started.</p>
            </div>
          ) : (
            fields.map((field, index) => (
              <Card key={field.id} className="relative bg-muted/20">
                <CardContent className="pt-6 px-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="absolute top-2 right-2 text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                    {/* Brand Select & Other Brand Input */}
                    <div className="flex flex-col gap-2">
                      <FormField
                        control={control}
                        name={`categories.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brand *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select brand" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categoryOptions.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                    </div>

                    {/* Grade */}
                    <FormField
                      control={control}
                      name={`categories.${index}.grade`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grade *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select grade" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {gradeOptions.map((grade) => (
                                <SelectItem key={grade} value={grade}>
                                  {grade}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Size */}
                    <FormField
                      control={control}
                      name={`categories.${index}.size`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sizeOptions.map((size) => (
                                <SelectItem key={size} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Inline Other Brand Input */}
                      {watch(`categories.${index}.name`) === 'Other' && (
                        <FormField
                          control={control}
                          name={`categories.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-muted-foreground">Write Brand Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Carhartt, Ed Hardy, Stone Island..."
                                  {...field}
                                  className="transition-all duration-300 focus:shadow-elegant"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                    {/* Quantity */}
                    <FormField
                      control={control}
                      name={`categories.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              placeholder="1"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                              className="transition-all duration-300 focus:shadow-elegant"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductStep;