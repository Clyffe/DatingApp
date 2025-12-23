export type Member = {
    id: string;
    dateofBirth: string;
    imageURL?: string;
    displayName: string;
    createdAt: string;
    lastActive: string;
    gender: string;
    description: string;
    city: string;
    country: string;
    isDeleted: boolean;
  }
  
  export type Photo =  {
    id: number;
    url: string;
    publicID?: any;
    memberId: string;
  }
  
  export type editableMember = {
    displayName: string;
    description?: string;
    city: string;
    country: string;
  }   