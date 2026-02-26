import { query } from '../../config/db';

export const getOverview = async (userId: number) => {
    // Just return basic stats for the stats bar if needed, or we can remove this if charts are gone.
    // Keeping it simple for now.
    const totalVideosRes = await query('SELECT COUNT(*) FROM analysis_logs WHERE user_id = $1', [userId]);
    return {
        totalVideos: parseInt(totalVideosRes.rows[0].count),
    };
};

export const getHistory = async (userId: number, limit: number = 10, offset: number = 0) => {
    const result = await query(
        'SELECT * FROM analysis_logs WHERE user_id = $1 ORDER BY analyzed_at DESC LIMIT $2 OFFSET $3',
        [userId, limit, offset]
    );
    return result.rows;
};

export const deleteAnalysisLog = async (id: number, userId: number) => {
    await query('DELETE FROM analysis_logs WHERE id = $1 AND user_id = $2', [id, userId]);
};

export const getLatestAnalysis = async (userId: number) => {
    const result = await query(
        'SELECT * FROM analysis_logs WHERE user_id = $1 ORDER BY analyzed_at DESC LIMIT 1',
        [userId]
    );
    return result.rows[0] || null;
};
