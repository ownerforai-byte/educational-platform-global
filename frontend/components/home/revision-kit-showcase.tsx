import { UnitKit } from '@/lib/revision-kit/types';

export function RevisionKitShowcase({ kit }: { kit: UnitKit }) {
  return (
    <div className='rounded-2xl border border-border/60 bg-card p-6 space-y-6'>
      <h3 className='text-lg font-semibold'>Summary</h3>
      <p className='text-muted-foreground'>{kit.summary}</p>
      
      {kit.formulas.length > 0 && (
        <div className='space-y-2'>
          <h4 className='font-medium'>Formulas</h4>
          {kit.formulas.map((f, i) => <p key={i} className='text-sm'>{f}</p>)}
        </div>
      )}
      
      {kit.constants.length > 0 && (
        <div className='space-y-2'>
          <h4 className='font-medium'>Constants</h4>
          {kit.constants.map((c, i) => <p key={i} className='text-sm'>{c}</p>)}
        </div>
      )}
    </div>
  );
}
