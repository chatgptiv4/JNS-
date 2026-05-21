/**
 * JNS Express Delivery - Package Tracking Data System
 * This module manages the persistence of tracking codes and their statuses.
 * For this implementation, we use localStorage to simulate a database.
 */

const DB_KEY = 'jns_tracking_db';

export const TrackingDB = {
    // Initialize DB with some dummy data if empty
    init() {
        if (!localStorage.getItem(DB_KEY)) {
            const initialData = [
                {
                    code: 'JNS123456789',
                    lat: 40.7128,
                    lng: -74.0060,
                    status: 'In Transit',
                    onHold: false,
                    updatedAt: new Date().toISOString(),
                    locationName: 'New York, USA'
                }
            ];
            localStorage.setItem(DB_KEY, JSON.stringify(initialData));
        }
    },

    getAll() {
        return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    },

    getByCode(code) {
        const all = this.getAll();
        return all.find(item => item.code.toUpperCase() === code.toUpperCase());
    },

    save(packageData) {
        const all = this.getAll();
        const index = all.findIndex(item => item.code === packageData.code);
        
        if (index !== -1) {
            all[index] = { ...packageData, updatedAt: new Date().toISOString() };
        } else {
            all.push({ ...packageData, updatedAt: new Date().toISOString() });
        }
        
        localStorage.setItem(DB_KEY, JSON.stringify(all));
        return true;
    },

    delete(code) {
        let all = this.getAll();
        all = all.filter(item => item.code !== code);
        localStorage.setItem(DB_KEY, JSON.stringify(all));
        return true;
    },

    generateCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'JNS';
        for (let i = 0; i < 9; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        // Ensure uniqueness
        if (this.getByCode(code)) return this.generateCode();
        return code;
    }
};
