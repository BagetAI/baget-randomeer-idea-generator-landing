import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

interface FormValues {
  industry: string;
  goal: string;
  contentType: string;
}

export function AIIdeaGeneratorForm() {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      industry: '',
      goal: '',
      contentType: '',
    },
  });

  const [idea, setIdea] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: FormValues) {
    setLoading(true);
    try {
      const res = await fetch('/api/ai-idea-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to fetch idea');
      const json = await res.json();
      setIdea(json.idea);
      toast({ title: 'New idea generated!' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not generate idea. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="industry">Industry (optional)</Label>
          <Input id="industry" placeholder="e.g., SaaS, Healthcare" {...register('industry')} />
        </div>
        <div>
          <Label htmlFor="goal">Campaign Goal (optional)</Label>
          <Input id="goal" placeholder="e.g., Increase signups" {...register('goal')} />
        </div>
        <div>
          <Label htmlFor="contentType">Content Type (optional)</Label>
          <Input id="contentType" placeholder="e.g., Blog posts, Videos" {...register('contentType')} />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Generating...' : 'Generate Personalized Idea'}
        </Button>
      </form>

      {idea && (
        <div className="mt-6 p-4 bg-purple-50 rounded text-purple-900 font-semibold">
          {idea}
        </div>
      )}
    </div>
  );
}
