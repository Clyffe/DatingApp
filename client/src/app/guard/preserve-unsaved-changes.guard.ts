import { CanDeactivateFn } from '@angular/router';
import { MemberProfileComponent } from '../members/member-profile/member-profile.component';

export const preserveUnsavedChangesGuard: CanDeactivateFn<MemberProfileComponent> = (component) => {
  if(component.editForm?.dirty){
    return confirm('Are you sure? All unsaved changes will be lost.')
  }
  return true;
};
