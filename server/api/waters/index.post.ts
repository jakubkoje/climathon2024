import { useDb } from "~~/server/utils/db";
import { sql as sqlDrizzle } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const db = useDb();

  /*const waters = await db.execute(sql`SELECT json_build_object(
                                        'type', 'FeatureCollection',
                                        'features', json_agg(
                                                json_build_object(
                                                        'type', 'Feature',
                                                        'properties', row_to_json(t)::jsonb - 'wkb_geometry',
                                                        'geometry', ST_AsGeoJSON(t.wkb_geometry)::json
                                                )
                                                    )
                                ) AS geojson
                         FROM (SELECT * FROM waters) t;`)

  return waters.rows;*/

  const { x, y, minimumDistance } = await readBody(event);

  const query = sqlDrizzle`
    SELECT
      CASE
        WHEN COUNT(*) = 0 THEN 'Far enough'
        ELSE 'Too close'
      END AS distance_check
    FROM waters
    WHERE ST_DWithin(wkb_geometry, ST_SetSRID(ST_MakePoint(${x}, ${y}), 4326), ${minimumDistance});
  `;

  const result = await db.execute(query);
  const distanceCheck = result.rows[0];

  return { distanceCheck };
});


