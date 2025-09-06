import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../HandpickForm';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, Phone, Mail, Building2, Globe, Clock, 
  Tag, Package, DollarSign, Calendar, Edit3,
  CheckCircle2, FileText 
} from 'lucide-react';
import { format } from 'date-fns';

const ReviewStep: React.FC = () => {
  const { control, watch, getValues } = useFormContext<FormData>();
  const formData = watch();

  const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
    { code: 'JPY', symbol: '¥' },
    { code: 'CAD', symbol: 'C$' },
    { code: 'AUD', symbol: 'A$' },
    { code: 'CHF', symbol: 'CHF' },
    { code: 'CNY', symbol: '¥' },
    { code: 'INR', symbol: '₹' },
  ];

  const getCurrencySymbol = (code: string) => {
    return currencies.find(c => c.code === code)?.symbol || '$';
  };

  const formatTimeSlot = (timeSlot: string) => {
    if (!timeSlot) return '';
    const time = new Date(`2024-01-01T${timeSlot}`);
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // const EditButton = ({ section }: { section: string }) => (
  //   <Button
  //     type="button"
  //     variant="ghost"
  //     size="sm"
  //     className="h-8 px-2 text-primary hover:text-primary-hover"
  //   >
  //     <Edit3 className="w-3 h-3 mr-1" />
  //     Edit
  //   </Button>
  // );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Review & Submit</h2>
        <p className="text-muted-foreground">
          Please review your information before submitting your handpick request
        </p>
      </div>

      <div className="grid gap-6">
        {/* Contact Information */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Contact Information
            </CardTitle>
            {/* <EditButton section="contact" /> */}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">{formData.name || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">{formData.whatsapp || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{formData.email || 'Not provided'}</p>
                </div>
              </div>
              {/* <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Company</p>
                  <p className="text-sm text-muted-foreground">{formData.company || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Business Type</p>
                  <p className="text-sm text-muted-foreground">{formData.businessType || 'Not provided'}</p>
                </div>
              </div> */}
              {/* <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Region</p>
                  <p className="text-sm text-muted-foreground">{formData.region || 'Not provided'}</p>
                </div>
              </div> */}
            </div>
          </CardContent>
        </Card>

        {/* Product Selection */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Product Selection
            </CardTitle>
            {/* <EditButton section="products" /> */}
          </CardHeader>
          <CardContent className="space-y-6">
           
            <div>
              {/* <div className="flex items-center gap-2 mb-3"> */}
                {/* <Tag className="w-4 h-4 text-muted-foreground" />
                <h4 className="font-medium">Selected Brands</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.brands?.length ? (
                  formData.brands.map((brand, index) => (
                    <Badge key={index} variant="secondary">
                      {brand}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No brands selected</p>
                )}
              </div> */}
              {formData.customBrand && (
                <div className="mt-2">
                  <Badge variant="outline">Custom: {formData.customBrand}</Badge>
                </div>
              )}
            </div>

            <Separator />

            {/* Categories */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-muted-foreground" />
                <h4 className="font-medium">Product Categories</h4>
              </div>
              {formData.categories?.length ? (
                <div className="space-y-3">
                  {formData.categories.map((category, index) => (
                    <Card key={index} className="bg-muted/20">
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Category:</span> {category.name}
                          </div>
                          <div>
                            <span className="font-medium">Grade:</span> {category.grade}
                          </div>
                          <div>
                            <span className="font-medium">Size:</span> {category.size}
                          </div>
                          <div>
                            <span className="font-medium">Color:</span> {category.color}
                          </div>
                          <div className="md:col-span-2">
                            <span className="font-medium">Quantity:</span> {category.quantity}
                          </div>
                          {category.description && (
                            <div className="md:col-span-4 pt-2">
                              <span className="font-medium">Description:</span> {category.description}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No categories added</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Budget Information */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Budget & Notes
            </CardTitle>
            {/* <EditButton section="budget" /> */}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium">Currency</p>
                <p className="text-sm text-muted-foreground">{formData.currency || 'Not selected'}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Budget Range</p>
                <p className="text-sm text-muted-foreground">
                  {formData.currency ? getCurrencySymbol(formData.currency) : '$'}
                  {formData.budgetFrom || 0} - {getCurrencySymbol(formData.currency || 'USD')}
                  {formData.budgetTo || 0}
                </p>
              </div>
            </div>
            {formData.notes && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Additional Notes</p>
                </div>
                <p className="text-sm text-muted-foreground bg-muted/20 p-3 rounded-lg">
                  {formData.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Schedule Information */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Consultation Schedule
            </CardTitle>
            {/* <EditButton section="schedule" /> */}
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {formData.date ? format(formData.date, 'PPP') : 'Not selected'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">
                    {formatTimeSlot(formData.timeSlot) || 'Not selected'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Timezone</p>
                  <p className="text-sm text-muted-foreground">
                    {formData.scheduleTimezone || 'Not selected'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consent */}
        <Card className="shadow-card border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <FormField
              control={control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium">
                      I agree to the terms and conditions *
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      By checking this box, I consent to Alvinte processing my information 
                      for the handpick consultation service. I understand that my data will 
                      be used to provide personalized product recommendations and that I can 
                      withdraw consent at any time.
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Final Confirmation */}
        <div className="text-center p-6 bg-gradient-to-r from-primary/5 to-luxury/5 rounded-xl">
          <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary mb-2">
            Ready to Submit Your Request?
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Once submitted, our team will review your requirements and contact you 
            within 24 hours to confirm your consultation and begin the handpick process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;