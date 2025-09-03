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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, Phone, Mail, Building2, Globe, Clock } from 'lucide-react';

const businessTypes = [
  'Retail',
  'Wholesale',
  'E-commerce',
  'Manufacturing',
  'Distribution',
  'Hospitality',
  'Healthcare',
  'Education',
  'Other'
];

const regions = [
  'North America',
  'South America',
  'Europe',
  'Asia Pacific',
  'Middle East',
  'Africa',
  'Australia & Oceania'
];

const timezones = [
  'GMT-12:00 (Baker Island)',
  'GMT-11:00 (Samoa)',
  'GMT-10:00 (Hawaii)',
  'GMT-09:00 (Alaska)',
  'GMT-08:00 (Pacific)',
  'GMT-07:00 (Mountain)',
  'GMT-06:00 (Central)',
  'GMT-05:00 (Eastern)',
  'GMT-04:00 (Atlantic)',
  'GMT-03:00 (Argentina)',
  'GMT-02:00 (South Georgia)',
  'GMT-01:00 (Cape Verde)',
  'GMT+00:00 (UTC)',
  'GMT+01:00 (Central European)',
  'GMT+02:00 (Eastern European)',
  'GMT+03:00 (Moscow)',
  'GMT+04:00 (Gulf)',
  'GMT+05:00 (Pakistan)',
  'GMT+05:30 (India)',
  'GMT+06:00 (Bangladesh)',
  'GMT+07:00 (Thailand)',
  'GMT+08:00 (China)',
  'GMT+09:00 (Japan)',
  'GMT+10:00 (Australia Eastern)',
  'GMT+11:00 (Solomon Islands)',
  'GMT+12:00 (New Zealand)'
];

const ContactStep: React.FC = () => {
  const { control } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Contact Details</h2>
        <p className="text-muted-foreground">
          Help us get to know you and your business better
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your full name" 
                  {...field} 
                  className="transition-all duration-300 focus:shadow-elegant"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                WhatsApp Number *
              </FormLabel>
              <FormControl>
                <Input 
                type='number'
                  placeholder="+1234567890" 
                  {...field}
                  className="transition-all duration-300 focus:shadow-elegant"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </FormLabel>
              <FormControl>
                <Input 
                  type="email"
                  placeholder="your.email@company.com" 
                  {...field}
                  className="transition-all duration-300 focus:shadow-elegant"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Company Name
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your company name (optional)" 
                  {...field}
                  className="transition-all duration-300 focus:shadow-elegant"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Business Type *
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="transition-all duration-300 focus:shadow-elegant">
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Region *
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="transition-all duration-300 focus:shadow-elegant">
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="timezone"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Timezone *
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="transition-all duration-300 focus:shadow-elegant">
                    <SelectValue placeholder="Select your timezone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timezones.map((timezone) => (
                    <SelectItem key={timezone} value={timezone}>
                      {timezone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ContactStep;