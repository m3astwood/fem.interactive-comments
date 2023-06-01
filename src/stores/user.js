import { ref, warn } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../lib/supabase.js';

export const useUserStore = defineStore('user', () => {
  const user = ref({});

  const login = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
      });

      if (error) throw error;

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      user.value = {};
    } catch (err) {
      console.error(err);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await supabase.auth.getUser();

      const { id, user_metadata: { user_name, avatar_url } } = data.user;

      user.value = { id, username: user_name, avatar: avatar_url };
      console.log(user.value);
    } catch (err) {
      console.error(err);
    }
  };
  return { user, login, logout, getUser };
});
