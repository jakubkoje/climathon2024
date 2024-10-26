import { sql as sqlDrizzle } from 'drizzle-orm';
import {useDb} from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
    const { x, y, minDistanceCanalisations, minDistanceElectricities, minDistanceGasses, minDistanceWaters } = await readBody(event);
    const db = useDb();

    const query = `
    WITH points AS (
      SELECT ST_SetSRID(ST_MakePoint(${x}, ${y}), 4326) AS geom
    )
    
    SELECT
      CASE WHEN EXISTS (
          SELECT 1 FROM canalisations c, points p
            WHERE ST_DWithin(c.wkb_geometry, p.geom, ${minDistanceCanalisations})
        ) THEN 'Too close to canalisations' ELSE 'Far enough from canalisations' END AS canalisations_check,
    
      CASE WHEN EXISTS (
        SELECT 1 FROM electricities e, points p
                 WHERE ST_DWithin(e.wkb_geometry, p.geom, ${minDistanceElectricities})
      ) THEN 'Too close to electricities' ELSE 'Far enough from electricities' END AS electricities_check,
    
      CASE WHEN EXISTS (
        SELECT 1 FROM gasses g, points p
                 WHERE ST_DWithin(g.wkb_geometry, p.geom, ${minDistanceGasses})
      ) THEN 'Too close to gasses' ELSE 'Far enough from gasses' END AS gasses_check,
    
      CASE WHEN EXISTS (
        SELECT 1 FROM waters w, points p
                 WHERE ST_DWithin(w.wkb_geometry, p.geom, ${minDistanceWaters})
      ) THEN 'Too close to waters' ELSE 'Far enough from waters' END AS waters_check,
    
      CASE WHEN EXISTS (
        SELECT 1
        FROM zones z
        JOIN lands l ON ST_Intersects(z.wkb_geometry, l.wkb_geometry)
        JOIN points p ON ST_Contains(z.wkb_geometry, p.geom)
        WHERE z.kod_z_geoportal::varchar IN ('101', '102', '201', '202', '301', '302', '303', '304', '401', '501', '502',
                                             '602', '701', '702', '703', '705', '801', '802', '1003', '1203')
      ) THEN 'Point is within specified kod_z_geoportal in zones and in lands'
      ELSE 'Point is outside specified kod_z_geoportal or not in lands'
      END AS zone_check;
      `;

    const result = await db.execute(query);
    const output = result.rows[0];

    return { output };
});
