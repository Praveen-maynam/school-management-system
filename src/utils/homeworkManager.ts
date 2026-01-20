// Shared Storage Key - Single Source of Truth
const HOMEWORK_STORAGE_KEY = 'shared_homework_data';

// Storage Event Emitter for cross-component updates
const createStorageEvent = () => {
  const event = new Event('homeworkUpdated');
  window.dispatchEvent(event);
};

// Homework Data Manager
class HomeworkManager {
  static getAll() {
    try {
      const data = localStorage.getItem(HOMEWORK_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading homework:', e);
      return [];
    }
  }

  static save(homeworkList: any[]) {
    try {
      localStorage.setItem(HOMEWORK_STORAGE_KEY, JSON.stringify(homeworkList));
      createStorageEvent();
      return true;
    } catch (e) {
      console.error('Error saving homework:', e);
      return false;
    }
  }

  static add(homework: any) {
    const list = this.getAll();
    const newHomework = {
      ...homework,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    list.push(newHomework);
    this.save(list);
    return newHomework;
  }

  static update(id: number, updates: any) {
    const list = this.getAll();
    const index = list.findIndex((hw: any) => hw.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updates, updatedAt: new Date().toISOString() };
      this.save(list);
      return list[index];
    }
    return null;
  }

  static delete(id: number) {
    const list = this.getAll();
    const filtered = list.filter((hw: any) => hw.id !== id);
    this.save(filtered);
    return filtered.length < list.length;
  }

  static getByClass(className: string) {
    return this.getAll().filter((hw: any) => hw.class === className);
  }
}

export default HomeworkManager;