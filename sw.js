const CACHE = 'system-v3';
const ASSETS = ['/', '/index.html', '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if(cached) return cached;
      return fetch(e.request).then(res => {
        if(!res||res.status!==200||res.type==='opaque') return res;
        const clone=res.clone();
        caches.open(CACHE).then(c=>c.put(e.request,clone));
        return res;
      }).catch(()=>caches.match('/index.html'));
    })
  );
});

// ── PUSH NOTIFICATIONS (for future server integration) ──
self.addEventListener('push', e => {
  let data={title:'THE SYSTEM',body:'System alert.',urgent:false,tag:'system'};
  try{ data=Object.assign(data,e.data.json()); }catch{}
  e.waitUntil(
    self.registration.showNotification(data.title,{
      body:data.body,
      icon:'icons/icon-192.png',
      badge:'icons/icon-192.png',
      vibrate:data.urgent?[200,100,200,100,400]:[100,50,100],
      requireInteraction:!!data.urgent,
      tag:data.tag,
      data:{url:self.location.origin}
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
      for(const c of list){ if('focus' in c) return c.focus(); }
      if(clients.openWindow) return clients.openWindow('/');
    })
  );
});

// ── BACKGROUND SYNC ──
self.addEventListener('sync', e => {
  if(e.tag==='overdue-check'){
    e.waitUntil(
      self.registration.showNotification('⚠ THE SYSTEM',{
        body:'You have overdue quests. The System is watching.',
        icon:'icons/icon-192.png',
        badge:'icons/icon-192.png',
        vibrate:[300,100,300],
        requireInteraction:true,
        tag:'overdue'
      })
    );
  }
});

// ── PERIODIC BACKGROUND SYNC (Chrome Android) ──
self.addEventListener('periodicsync', e => {
  if(e.tag==='daily-reminder'){
    e.waitUntil(
      self.registration.showNotification('⚡ THE SYSTEM',{
        body:'Daily quests are waiting. Do not break your streak.',
        icon:'icons/icon-192.png',
        badge:'icons/icon-192.png',
        vibrate:[100,50,100],
        tag:'daily'
      })
    );
  }
});
