import { sql as sqlDrizzle } from 'drizzle-orm';
import {useDb} from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
    const { p1, p2, p3, p4, minDistanceCanalisations, minDistanceElectricities, minDistanceGasses, minDistanceWaters } = await readBody(event);

    const db = useDb();

    const query = sqlDrizzle`
    WITH points AS (
      SELECT ST_SetSRID(ST_MakePoint(${p1.x}, ${p1.y}), 4326) AS geom
      UNION ALL
      SELECT ST_SetSRID(ST_MakePoint(${p2.x}, ${p2.y}), 4326)
      UNION ALL
      SELECT ST_SetSRID(ST_MakePoint(${p3.x}, ${p3.y}), 4326)
      UNION ALL
      SELECT ST_SetSRID(ST_MakePoint(${p4.x}, ${p4.y}), 4326)
    )
    SELECT 
      CASE WHEN EXISTS (
        SELECT 1 FROM canalisations c, points p WHERE ST_DWithin(c.wkb_geometry, p.geom, ${minDistanceCanalisations})
      ) THEN 'Too close to canalisations' ELSE 'Far enough from canalisations' END AS canalisations_check,
      
      CASE WHEN EXISTS (
        SELECT 1 FROM electricities e, points p WHERE ST_DWithin(e.wkb_geometry, p.geom, ${minDistanceElectricities})
      ) THEN 'Too close to electricities' ELSE 'Far enough from electricities' END AS electricities_check,

      CASE WHEN EXISTS (
        SELECT 1 FROM gasses g, points p WHERE ST_DWithin(g.wkb_geometry, p.geom, ${minDistanceGasses})
      ) THEN 'Too close to gasses' ELSE 'Far enough from gasses' END AS gasses_check,

      CASE WHEN EXISTS (
        SELECT 1 FROM waters w, points p WHERE ST_DWithin(w.wkb_geometry, p.geom, ${minDistanceWaters})
      ) THEN 'Too close to waters' ELSE 'Far enough from waters' END AS waters_check;
  `;

    const result = await db.execute(query);
    console.log("Log: ", result.rows[0]);

    return result.rows[0];
});
