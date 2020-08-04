import {useState, useEffect} from 'react';

export const useAuth = (): boolean => {
  // 1. Check redux store authenticated
  // 2. If true - return true
  // 3. Else send request to api/token/check
  // 4. If true - return true
  // 5. Else if false and has refresh token - send request to api/token/refresh
  // 6. if user is not authenticated and no refresh token - redirect to logout
};
