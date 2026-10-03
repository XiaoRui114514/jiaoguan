'use strict';
/* Private, versioned local storage. Never read/remove another site's Settings/gallery. */
(function () {
  const prefix = 'Jiaoguan.v4.';
  const previousPrefix = 'Jiaoguan.v3.';
  const version = '4.3.1', schema = 4;
  const memory = new Map();
  const listeners = { create: [], update: [], delete: [] };
  let persistent = true;
  let failure = '';
  let disk;
  try {
    disk = window.localStorage;
    disk.setItem(prefix + 'probe', '1');
    disk.removeItem(prefix + 'probe');
  } catch (error) {
    persistent = false;
    failure = error.name || 'StorageUnavailable';
  }
  const clone = (value) => JSON.parse(JSON.stringify(value));
  function read(key) {
    if (memory.has(key)) return clone(memory.get(key));
    if (!disk) return undefined;
    let raw;
    try { raw = disk.getItem(prefix + key); } catch (_) { return undefined; }
    if (raw === null) return undefined;
    try { return JSON.parse(raw); } catch (_) { return null; }
  }
  function write(key, value) {
    memory.set(key, clone(value));
    if (disk) {
      try { disk.setItem(prefix + key, JSON.stringify(value)); }
      catch (error) { persistent = false; failure = error.name || 'StorageUnavailable'; }
    }
  }
  function all() {
    const values = Object.fromEntries(memory);
    if (disk) {
      try {
        for (let i = 0; i < disk.length; i++) {
          const key = disk.key(i);
          if (key?.startsWith(prefix)) {
            const local = key.slice(prefix.length);
            const value = read(local);
            if (value !== undefined) values[local] = value;
          }
        }
      } catch (_) {}
    }
    return values;
  }
  const adapter = {
    configuration() { return { name: 'jiaoguan', version, store: 'v4' }; },
    async get(key) {
      const value = read(key);
      if (value === undefined) throw new Error('No saved value for ' + key);
      return clone(value);
    },
    async getAll() { return clone(all()); },
    async set(key, value) {
      const exists = read(key) !== undefined;
      write(key, value);
      listeners[exists ? 'update' : 'create'].forEach((fn) => fn(key, clone(value)));
      return clone(value);
    },
    async update(key, value) { return this.set(key, value); },
    async remove(key) {
      memory.delete(key);
      try { disk?.removeItem(prefix + key); } catch (_) {}
      listeners.delete.forEach((fn) => fn(key));
    },
    async each(callback) { return Promise.all(Object.entries(all()).map(([key, value]) => callback(key, clone(value)))); },
    onCreate(callback) { listeners.create.push(callback); },
    onUpdate(callback) { listeners.update.push(callback); },
    onDelete(callback) { listeners.delete.push(callback); },
    upgrade() {}
  };
  function validSave(value) {
    const story = window.monogatari?.script();
    const state = value?.game?.state;
    return Boolean(state && [version, '4.3.0', '4.2.2', '4.2.1', '4.2.0', '4.1.0', '4.0.0'].includes(value.version) && value.game.storage?.schema === schema && value.game.history && Array.isArray(state.characters) && Array.isArray(state.music) && Array.isArray(story?.[state.label]) && Number.isInteger(state.step) && state.step >= 0 && state.step < story[state.label].length);
  }
  function journal(data) {
    return {
      events: data?.events && typeof data.events === 'object' && !Array.isArray(data.events) ? clone(data.events) : {},
      choices: Array.isArray(data?.choices) ? clone(data.choices) : []
    };
  }
  let migrated = false;
  if (disk && !read('migration')) {
    for (const key of ['Settings', 'presentation', 'gallery']) {
      try {
        const raw = disk.getItem(previousPrefix + key);
        if (raw && read(key) === undefined) { write(key, JSON.parse(raw)); migrated = true; }
      } catch (_) {}
    }
    write('migration', { version, migrated, date: new Date().toISOString() });
  }
  window.JiaoguanStorage = {
    prefix, adapter, read, write, validSave, version, schema, journal,
    get migrated() { return Boolean(read('migration')?.migrated); },
    get persistent() { return persistent; },
    get failure() { return failure; },
    async saves() {
      return Object.entries(all()).filter(([key, value]) => /^(JiaoguanSave_|JiaoguanAuto_)/.test(key) && validSave(value)).map(([key, value]) => ({ key, ...value })).sort((a, b) => String(b.date).localeCompare(String(a.date)));
    },
    clearSaves() {
      Object.keys(all()).filter((key) => /^(JiaoguanSave_|JiaoguanAuto_)/.test(key)).forEach((key) => adapter.remove(key));
    },
    resetAll() {
      Object.keys(all()).forEach((key) => adapter.remove(key));
      write('migration', { version, migrated: false, date: new Date().toISOString() });
    },
    get legacyCount() {
      try {
        return Object.keys(disk || {}).filter((key) => /^Jiaoguan(Save|Auto)_/.test(key) || key.startsWith(previousPrefix + 'JiaoguanSave_') || key.startsWith(previousPrefix + 'JiaoguanAuto_')).length;
      } catch (_) { return 0; }
    }
  };
  // The engine accepts its public storage interface before init; vendor remains untouched.
  monogatari.Storage = adapter;
  monogatari.storage({ events: {}, choices: [] });
})();
