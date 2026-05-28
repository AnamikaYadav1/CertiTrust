export const success = (res, data) => res.status(200).json({ success: true, data });
export const error = (res, message) => res.status(500).json({ success: false, message });
